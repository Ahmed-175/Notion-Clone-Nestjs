import { Test, TestingModule } from "@nestjs/testing";
import { NodesController } from "../nodes.controller";
import { NodesService } from "../nodes.service";
import { UpdateNodeDto } from "../dto/update-node";

describe("NodesController", () => {
  let controller: NodesController;
  let service: NodesService;

  const mockNodesService = {
    create: jest.fn(),
    updatenode: jest.fn(),
    sortDelete: jest.fn(),
    getNoteTree: jest.fn(),
    handlefavorite: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodesController],
      providers: [
        {
          provide: NodesService,
          useValue: mockNodesService,
        },
      ],
    }).compile();

    controller = module.get<NodesController>(NodesController);
    service = module.get<NodesService>(NodesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should call createNode and return result", async () => {
    const dto: any = { title: "Test Node", type: "note", parentId: null };
    const req = { user: { _id: "user-id" } };
    const expectedResult = { message: "created" };

    mockNodesService.create.mockResolvedValue(expectedResult);

    const result = await controller.createNode(dto, req);

    expect(service.create).toHaveBeenCalledWith(dto, "user-id");
    expect(result).toEqual(expectedResult);
  });

  it("should call updateNode and return result", async () => {
    const dto: UpdateNodeDto = { title: "Updated Title" };
    const id = "node-id";
    const req = { user: { _id: "user-id" } };
    const expectedResult = { title: "Updated Title" };

    mockNodesService.updatenode.mockResolvedValue(expectedResult);

    const result = await controller.updateNode(dto, id, req);

    expect(service.updatenode).toHaveBeenCalledWith(
      "Updated Title",
      id,
      "user-id",
    );
    expect(result).toEqual(expectedResult);
  });

  it("should call softDeleteNode and return result", async () => {
    const id = "node-id";
    const req = { user: { _id: "user-id" } };
    const expectedResult = { isTrash: true };

    mockNodesService.sortDelete.mockResolvedValue(expectedResult);

    const result = await controller.softDeleteNode(id, req);

    expect(service.sortDelete).toHaveBeenCalledWith(id, "user-id");
    expect(result).toEqual(expectedResult);
  });

  it("should call getNodes and return result", async () => {
    const req = { user: { _id: "user-id" } };
    const expectedResult = { map: {} };

    mockNodesService.getNoteTree.mockResolvedValue(expectedResult);

    const result = await controller.getNodes(req);

    expect(service.getNoteTree).toHaveBeenCalledWith("user-id");
    expect(result).toEqual(expectedResult);
  });

  it("should call toggleFavorite and return result", async () => {
    const id = "node-id";
    const req = { user: { _id: "user-id" } };
    const expectedResult = { message: "Added to favorites" };

    mockNodesService.handlefavorite.mockResolvedValue(expectedResult);

    const result = await controller.toggleFavorite(id, req);

    expect(service.handlefavorite).toHaveBeenCalledWith(id, "user-id");
    expect(result).toEqual(expectedResult);
  });
});
