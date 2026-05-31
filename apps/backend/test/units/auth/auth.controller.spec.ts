import { UsersService } from "src/users/users.service";
import { AuthController } from "../../../src/auth/auth.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginAuthDto } from "../../../src/auth/dto/login-user.dto";

describe("AuthController", () => {
  let controller: AuthController;
  let usersService: UsersService;
  let module: TestingModule;

  const mockUserService = {
    create: jest.fn(),
    checkUser: jest.fn(),
    googleAuth: jest.fn(),
    me: jest.fn(),
  };
  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    await module.close();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should register user and return message", async () => {
    const dto: CreateUserDto = {
      username: "Test user ",
      email: "test323@gmail.com",
      password: "123456",
    };

    mockUserService.create.mockResolvedValue("fake-jwt-token");

    const res: any = {
      cookie: jest.fn(),
    };

    const result = await controller.register(dto as any, res);

    expect(mockUserService.create).toHaveBeenCalledWith(dto);
    expect(res.cookie).toHaveBeenCalledWith(
      "access_token",
      "fake-jwt-token",
      expect.objectContaining({
        httpOnly: true,
      }),
    );

    expect(result).toEqual({
      message: "Register Successful",
    });
  });

  it("login user", async () => {
    const dto: LoginAuthDto = {
      email: "testing@testing.com",
      password: "123456",
    };

    mockUserService.checkUser.mockResolvedValue("jwt-token");

    const res: any = {
      cookie: jest.fn(),
    };
    const result = await controller.login(dto as any, res);

    expect(mockUserService.checkUser).toHaveBeenCalledWith(dto);
    expect(res.cookie).toHaveBeenCalledWith(
      "access_token",
      "jwt-token",
      expect.objectContaining({
        httpOnly: true,
      }),
    );
    expect(result).toEqual({ message: "Login successful" });
  });

  it("get current user ", async () => {
    const req: any = { user: { _id: "123" } };
    mockUserService.me.mockResolvedValue({
      _id: "123",
      email: "test@test.com",
    });

    const result: any = await controller.me(req);

    expect(mockUserService.me).toHaveBeenCalledWith("123");
    expect(result._id).toBe("123");
  });
});
