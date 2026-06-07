import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { NodesService } from "../../../src/nodes/nodes.service";
import { Node } from "../../../src/nodes/schemas/node.schema";
import { Note } from "../../../src/nodes/schemas/note.schema";
import { BuildTree } from "../../../src/common/utils/buildTreeFileSystem";
import { BadRequestException } from "@nestjs/common";
import mongoose from "mongoose";

describe("NodesService", () => {
  let service: NodesService;
  let nodeModel: any;
  let noteModel: any;
  let buildTree: BuildTree;

  const mockNode = {
    _id: new mongoose.Types.ObjectId(),
    title: "Test Node",
    type: "note",
    parentId: null,
    ownerId: new mongoose.Types.ObjectId(),
    isFavorite: false,
    isTrash: false,
    save: jest.fn().mockResolvedValue(this),
  };

  const mockNodeModel = jest.fn().mockImplementation((dto) => ({
    ...dto,
    _id: new mongoose.Types.ObjectId(),
    save: jest.fn().mockResolvedValue(this),
  })) as any;

  mockNodeModel.findOne = jest.fn();
  mockNodeModel.find = jest.fn();
  mockNodeModel.findOneAndUpdate = jest.fn();
  mockNodeModel.deleteOne = jest.fn();

  const mockNoteModel = jest.fn().mockImplementation((dto) => ({
    ...dto,
    save: jest.fn().mockResolvedValue(this),
  })) as any;

  mockNoteModel.findOne = jest.fn();

  const mockBuildTree = {
    buildNormalized: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodesService,
        {
          provide: getModelToken(Node.name),
          useValue: mockNodeModel,
        },
        {
          provide: getModelToken(Note.name),
          useValue: mockNoteModel,
        },
        {
          provide: BuildTree,
          useValue: mockBuildTree,
        },
      ],
    }).compile();

    service = module.get<NodesService>(NodesService);
    nodeModel = module.get(getModelToken(Node.name));
    noteModel = module.get(getModelToken(Note.name));
    buildTree = module.get<BuildTree>(BuildTree);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new node successfully", async () => {
      const dto: any = { title: "New Note", type: "note", parentId: null };
      const userId = new mongoose.Types.ObjectId().toString();

      mockNodeModel.findOne.mockResolvedValue(null); // No existing title

      const result = await service.create(dto, userId);

      expect(mockNodeModel.findOne).toHaveBeenCalled();
      expect(result).toHaveProperty("message", "item created successfully");
      expect(result).toHaveProperty("node");
    });

    it("should throw BadRequestException if title already exists", async () => {
      const dto: any = { title: "Existing Note", type: "note", parentId: null };
      const userId = new mongoose.Types.ObjectId().toString();

      mockNodeModel.findOne.mockResolvedValue({ _id: "some-id" });

      const result: any = await service.create(dto, userId);

      expect(result.errorMessage).toBeInstanceOf(BadRequestException);
      expect(result.errorMessage.message).toBe("the title is already used");
    });
  });

  describe("sortDelete (soft delete)", () => {
    it("should mark a node as trash", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const userId = new mongoose.Types.ObjectId().toString();
      const updatedNode = { ...mockNode, isTrash: true };

      mockNodeModel.findOneAndUpdate.mockResolvedValue(updatedNode);

      const result = await service.sortDelete(id, userId);

      expect(mockNodeModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: id, ownerId: userId, isTrash: false },
        { isTrash: true },
        { new: true },
      );
      expect(result).toEqual(updatedNode);
    });
  });

  describe("handlefavorite", () => {
    it("should toggle favorite status", async () => {
      const id = new mongoose.Types.ObjectId().toString();
      const userId = new mongoose.Types.ObjectId().toString();
      const node = {
        ...mockNode,
        isFavorite: false,
        save: jest.fn().mockResolvedValue(true),
      };

      mockNodeModel.findOne.mockResolvedValue(node);

      const result = await service.handlefavorite(id, userId);

      expect(node.isFavorite).toBe(true);
      expect(node.save).toHaveBeenCalled();
      expect(result.message).toBe("Added to favorites");
    });
  });

  describe("getNoteTree", () => {
    it("should return a built tree", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const nodes = [{ title: "Node 1", type: "folder" }, { title: "Node 2", type: "note" }];
      mockNodeModel.find.mockResolvedValue(nodes);
      mockBuildTree.buildNormalized.mockReturnValue({ root: [] });

      const result = await service.getNoteTree(userId);

      expect(mockNodeModel.find).toHaveBeenCalledWith({ ownerId: userId, isTrash: false });
      expect(mockBuildTree.buildNormalized).toHaveBeenCalled();
      expect(result).toEqual({ map: { root: [] } });
    });
  });
});
