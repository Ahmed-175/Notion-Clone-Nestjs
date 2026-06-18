import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";
import { PasswordHasher } from "src/common/utils/password.util";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import mongoose from "mongoose";

describe("UsersService", () => {
  let service: UsersService;
  let userModel: any;
  let hasher: PasswordHasher;
  let jwtService: JwtService;

  const mockUser = {
    _id: new mongoose.Types.ObjectId(),
    username: "testuser",
    email: "test@example.com",
    password: "hashedpassword",
    save: jest.fn(),
  };

  const mockUserModel = jest.fn().mockImplementation((dto) => ({
    ...dto,
    _id: new mongoose.Types.ObjectId(),
    save: jest.fn().mockResolvedValue(true),
  })) as any;

  mockUserModel.findOne = jest.fn();
  mockUserModel.find = jest.fn();
  mockUserModel.findById = jest.fn();

  const mockHasher = {
    hash: jest.fn().mockResolvedValue("hashedpassword"),
    comparePasswords: jest.fn().mockResolvedValue(true),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue("mock-token"),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: PasswordHasher,
          useValue: mockHasher,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
    hasher = module.get<PasswordHasher>(PasswordHasher);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("googleAuth", () => {
    it("should return a token for existing user", async () => {
      const userData = {
        username: "googleuser",
        email: "google@example.com",
        google_id: "123",
      };
      mockUserModel.findOne.mockResolvedValue(mockUser);

      const result = await service.googleAuth(userData);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(jwtService.sign).toHaveBeenCalled();
      expect(result).toBe("mock-token");
    });

    it("should create a new user and return a token if user doesn't exist", async () => {
      const userData = {
        username: "newgoogleuser",
        email: "newgoogle@example.com",
        google_id: "456",
      };
      mockUserModel.findOne.mockResolvedValue(null);

      const result = await service.googleAuth(userData);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(jwtService.sign).toHaveBeenCalled();
      expect(result).toBe("mock-token");
    });
  });

  describe("create", () => {
    it("should create a new user successfully", async () => {
      const dto = {
        username: "newuser",
        email: "new@example.com",
        password: "password123",
      };
      mockUserModel.find.mockResolvedValue([]);
      mockUserModel.findOne.mockResolvedValue(null);

      const result = await service.create(dto);

      expect(mockUserModel.find).toHaveBeenCalledWith({ username: dto.username });
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: dto.email });
      expect(hasher.hash).toHaveBeenCalledWith(dto.password);
      expect(jwtService.sign).toHaveBeenCalled();
      expect(result).toBe("mock-token");
    });

    it("should throw BadRequestException if username exists", async () => {
      const dto = {
        username: "existinguser",
        email: "new@example.com",
        password: "password123",
      };
      mockUserModel.find.mockResolvedValue([{ _id: "someid" }]);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it("should throw BadRequestException if email exists", async () => {
      const dto = {
        username: "newuser",
        email: "existing@example.com",
        password: "password123",
      };
      mockUserModel.find.mockResolvedValue([]);
      mockUserModel.findOne.mockResolvedValue({ _id: "someid" });

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe("checkUser", () => {
    it("should return token for valid credentials", async () => {
      const dto = { email: "test@example.com", password: "password123" };
      const userWithPassword = {
        ...mockUser,
        select: jest.fn().mockReturnValue({
          ...mockUser,
          password: "hashedpassword",
        }),
      };
      mockUserModel.findOne.mockReturnValue(userWithPassword);

      const result = await service.checkUser(dto);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: dto.email });
      expect(hasher.comparePasswords).toHaveBeenCalledWith(dto.password, "hashedpassword");
      expect(result).toBe("mock-token");
    });

    it("should throw BadRequestException if user not found", async () => {
      const dto = { email: "nonexistent@example.com", password: "password123" };
      mockUserModel.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(service.checkUser(dto)).rejects.toThrow(BadRequestException);
    });

    it("should throw UnauthorizedException if password is wrong", async () => {
      const dto = { email: "test@example.com", password: "wrongpassword" };
      const userWithPassword = {
        ...mockUser,
        select: jest.fn().mockReturnValue({
          ...mockUser,
          password: "hashedpassword",
        }),
      };
      mockUserModel.findOne.mockReturnValue(userWithPassword);
      mockHasher.comparePasswords.mockResolvedValue(false);

      await expect(service.checkUser(dto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("me", () => {
    it("should return user by id", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      mockUserModel.findById.mockResolvedValue(mockUser);

      const result = await service.me(userId);

      expect(mockUserModel.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockUser);
    });
  });
});
