import { Test, TestingModule } from "@nestjs/testing";
import { PresenceService } from "./presence.service";
import { RedisService } from "src/redis/redis.service";
import { getModelToken } from "@nestjs/mongoose";
import { User } from "src/users/schemas/user.schema";

describe("PresenceService", () => {
  let service: PresenceService;

  const mockRedisService = {
    addToSet: jest.fn(),
    getSetMembers: jest.fn(),
    removeFromSet: jest.fn(),
  };

  const mockUserModel = {
    findById: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PresenceService,
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<PresenceService>(PresenceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
