import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { NotesService } from "./notes.service";
import { Note } from "src/nodes/schemas/note.schema";
import { Node } from "src/nodes/schemas/node.schema";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import mongoose from "mongoose";

describe("NotesService", () => {
  let service: NotesService;
  let noteModel: any;
  let nodeModel: any;

  const mockNode = {
    _id: new mongoose.Types.ObjectId(),
    ownerId: new mongoose.Types.ObjectId(),
    contributors: [],
    isTrash: false,
  };

  const mockNote = {
    _id: new mongoose.Types.ObjectId(),
    nodeId: mockNode._id,
    content: "Initial content",
    save: jest.fn().mockResolvedValue(true),
  };

  const mockNodeModel = {
    findOne: jest.fn(),
    findById: jest.fn(),
  };

  const mockNoteModel = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getModelToken(Note.name),
          useValue: mockNoteModel,
        },
        {
          provide: getModelToken(Node.name),
          useValue: mockNodeModel,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    noteModel = module.get(getModelToken(Note.name));
    nodeModel = module.get(getModelToken(Node.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findByNodeId", () => {
    it("should return merged node and note data", async () => {
      const nodeId = mockNode._id.toString();
      mockNodeModel.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockNode),
      });
      mockNoteModel.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockNote),
      });

      const result = await service.findByNodeId(nodeId);

      expect(nodeModel.findOne).toHaveBeenCalledWith({ _id: nodeId, isTrash: false });
      expect(noteModel.findOne).toHaveBeenCalledWith({ nodeId });
      expect(result).toEqual({ ...mockNode, ...mockNote });
    });

    it("should throw BadRequestException if node not found", async () => {
      mockNodeModel.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findByNodeId("invalid-id")).rejects.toThrow(BadRequestException);
    });

    it("should throw BadRequestException if note not found", async () => {
      mockNodeModel.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockNode),
      });
      mockNoteModel.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findByNodeId(mockNode._id.toString())).rejects.toThrow(BadRequestException);
    });
  });

  describe("handleContentChanges", () => {
    it("should update content if user is owner", async () => {
      const userId = mockNode.ownerId.toString();
      const nodeId = mockNode._id.toString();
      const newContent = "Updated content";

      mockNodeModel.findById.mockResolvedValue(mockNode);
      mockNoteModel.findOne.mockResolvedValue({ ...mockNote, save: jest.fn() });

      const result = await service.handleContentChanges(userId, newContent, nodeId);

      expect(result).toBe(newContent);
    });

    it("should update content if user is contributor", async () => {
      const contributorId = new mongoose.Types.ObjectId();
      const nodeWithContributor = { ...mockNode, contributors: [contributorId] };
      const nodeId = mockNode._id.toString();
      const newContent = "Updated content";

      mockNodeModel.findById.mockResolvedValue(nodeWithContributor);
      mockNoteModel.findOne.mockResolvedValue({ ...mockNote, save: jest.fn() });

      const result = await service.handleContentChanges(contributorId.toString(), newContent, nodeId);

      expect(result).toBe(newContent);
    });

    it("should throw UnauthorizedException if user is not owner or contributor", async () => {
      const strangerId = new mongoose.Types.ObjectId().toString();
      const nodeId = mockNode._id.toString();

      mockNodeModel.findById.mockResolvedValue(mockNode);
      mockNoteModel.findOne.mockResolvedValue(mockNote);

      await expect(service.handleContentChanges(strangerId, "new content", nodeId)).rejects.toThrow(UnauthorizedException);
    });

    it("should throw NotFoundException if node or note not found", async () => {
      mockNodeModel.findById.mockResolvedValue(null);

      await expect(service.handleContentChanges("user-id", "content", "node-id")).rejects.toThrow(NotFoundException);
    });
  });
});
