import { Global, Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import Redis from "ioredis";
import { REDIS_CLIENT } from "./redis.constants";

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || "localhost",
          port: Number(process.env.REDIS_PORT) || 6379,
          retryStrategy: (times) => {
            return Math.min(times * 50, 2000);
          },
        });
      },
    },
    RedisService,
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
