import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { getModelToken } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";

describe("UsersController", () => {
  let controller: UsersController;
  let userService: UsersService;
  let userModel: any;

  const mockUsersService = {
    // Methods if needed
  };

  const mockUserModel = {
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("upload", () => {
    it("should update user picture and return filename", async () => {
      const picture = { filename: "test-image.jpg" };
      const req = { user: { _id: "user-id" } };

      mockUserModel.findByIdAndUpdate.mockResolvedValue({});

      const result = await controller.upload(picture, req);

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("user-id", {
        picture: "test-image.jpg",
      });
      expect(result).toEqual({ url: "test-image.jpg" });
    });
  });
});
