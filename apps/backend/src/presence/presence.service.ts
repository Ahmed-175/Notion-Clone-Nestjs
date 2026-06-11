import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RedisService } from "src/redis/redis.service";
import { User } from "src/users/schemas/user.schema";
import { Model } from "mongoose";
import { ActiveUser } from "./dto/ActiveUser.dto";

@Injectable()
export class PresenceService {
  constructor(
    private readonly redisService: RedisService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async addActiveUser(userId: string, noteId: string): Promise<ActiveUser> {
    const user = await this.userModel
      .findById(userId)
      .select("_id username email picture")
      .lean<ActiveUser>();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.redisService.addToSet(`note:${noteId}:online-users`, userId);

    return user;
  }
  async getSetMembers(noteId: string): Promise<ActiveUser[]> {
    const userIds = await this.redisService.getSetMembers(
      `note:${noteId}:online-users`,
    );
    const users = await this.userModel
      .find({
        _id: { $in: userIds },
      })
      .select("_id username email picture")
      .lean<ActiveUser[]>();
    return users;
  }

  async removeActiveUser(userId: string, noteId: string): Promise<number> {
    return await this.redisService.removeFromSet(
      `note:${noteId}:online-users`,
      userId,
    );
  }
}
