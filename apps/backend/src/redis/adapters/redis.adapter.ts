import { Injectable } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { RedisService } from "../redis.service";
import { Server, ServerOptions } from "socket.io";

@Injectable()
export class RedisIoAdapter extends IoAdapter {
  private adapterConstrunctor: ReturnType<typeof createAdapter>;
  constructor(private readonly redisService: RedisService) {
    super();
  }

  connectToRedis() {
    const pubClient = this.redisService.getClient();
    const subClient = this.redisService.createSubscriber();

    this.adapterConstrunctor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options) as Server;

    server.adapter(this.adapterConstrunctor);

    return server;
  }
}
