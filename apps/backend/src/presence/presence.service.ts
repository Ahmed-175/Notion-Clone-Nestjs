import { Injectable } from '@nestjs/common';
import { redis } from 'src/providers/redis.provider';

@Injectable()
export class PresenceService {
  async join(noteId: string, userId: string) {
    await redis.sadd(`notes:${noteId}:users`, userId);
    return this.getCount(noteId);
  }
  async leave(notedId: string, userId: string) {
    await redis.srem(`note:${notedId}:users`, userId);
    return this.getCount(notedId);
  }

  async getCount(noteId: string) {
    return await redis.scard(`note:${noteId}:users`);
  }
}
