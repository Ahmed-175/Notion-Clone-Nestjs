import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS_CLIENT } from "./redis.constants";

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async set(key: string, value: string, ttlSeconds?: number) {
    if (ttlSeconds) {
      await this.redis.set(key, value, "EX", ttlSeconds);
    }
    await this.redis.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async delete(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async addToSet(key: string, value: string): Promise<number> {
    return this.redis.sadd(key, value);
  }

  async removeFromSet(key: string, value: string): Promise<number> {
    return this.redis.srem(key, value);
  }

  async getSetMembers(key: string): Promise<string[]> {
    return this.redis.smembers(key);
  }

  async getSetCount(key: string): Promise<number> {
    return this.redis.scard(key);
  }
}
