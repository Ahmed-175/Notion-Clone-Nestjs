import { Test, TestingModule } from "@nestjs/testing";
import { RedisService } from "../redis.service";
import { REDIS_CLIENT } from "../redis.constants";

describe("RedisService", () => {
  let service: RedisService;
  let redisClient: any;

  const mockRedisClient = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
    sadd: jest.fn(),
    srem: jest.fn(),
    smembers: jest.fn(),
    scard: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: REDIS_CLIENT,
          useValue: mockRedisClient,
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
    redisClient = module.get(REDIS_CLIENT);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("set", () => {
    it("should set a value without TTL", async () => {
      await service.set("key", "value");
      expect(redisClient.set).toHaveBeenCalledWith("key", "value");
    });

    it("should set a value with TTL", async () => {
      await service.set("key", "value", 100);
      expect(redisClient.set).toHaveBeenCalledWith("key", "value", "EX", 100);
    });
  });

  describe("get", () => {
    it("should get a value", async () => {
      redisClient.get.mockResolvedValue("value");
      const result = await service.get("key");
      expect(redisClient.get).toHaveBeenCalledWith("key");
      expect(result).toBe("value");
    });
  });

  describe("delete", () => {
    it("should delete a key", async () => {
      redisClient.del.mockResolvedValue(1);
      const result = await service.delete("key");
      expect(redisClient.del).toHaveBeenCalledWith("key");
      expect(result).toBe(1);
    });
  });

  describe("addToSet", () => {
    it("should add to set", async () => {
      redisClient.sadd.mockResolvedValue(1);
      const result = await service.addToSet("key", "member");
      expect(redisClient.sadd).toHaveBeenCalledWith("key", "member");
      expect(result).toBe(1);
    });
  });

  describe("removeFromSet", () => {
    it("should remove from set", async () => {
      redisClient.srem.mockResolvedValue(1);
      const result = await service.removeFromSet("key", "member");
      expect(redisClient.srem).toHaveBeenCalledWith("key", "member");
      expect(result).toBe(1);
    });
  });

  describe("getSetMembers", () => {
    it("should get set members", async () => {
      redisClient.smembers.mockResolvedValue(["m1", "m2"]);
      const result = await service.getSetMembers("key");
      expect(redisClient.smembers).toHaveBeenCalledWith("key");
      expect(result).toEqual(["m1", "m2"]);
    });
  });

  describe("getSetCount", () => {
    it("should get set count", async () => {
      redisClient.scard.mockResolvedValue(2);
      const result = await service.getSetCount("key");
      expect(redisClient.scard).toHaveBeenCalledWith("key");
      expect(result).toBe(2);
    });
  });
});
