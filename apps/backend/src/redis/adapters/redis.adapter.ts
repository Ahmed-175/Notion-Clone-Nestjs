import { Injectable } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { RedisService } from "../redis.service";

@Injectable()
export class RedisIoAdapter extends IoAdapter {
  private adapterConstrunctor: ReturnType<typeof createAdapter>;
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async connectToRedis() {
    const pubClient = this.redisService.getClient();
    const subClient = this.redisService.createSubscriber();

    await subClient.connect();

    this.adapterConstrunctor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: any) {
    const server = super.create(port, options);

    server.adapter(this.adapterConstrunctor);

    return server;
  }
}
