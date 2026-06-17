import { Test, TestingModule } from "@nestjs/testing";
import { ContentGateway } from "./content.gateway";
import { ContentService } from "./content.service";
import { NotesService } from "src/notes/notes.service";

describe("ContentGateway", () => {
  let gateway: ContentGateway;

  const mockNotesService = {
    handleContentChanges: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentGateway,
        ContentService,
        {
          provide: NotesService,
          useValue: mockNotesService,
        },
      ],
    }).compile();

    gateway = module.get<ContentGateway>(ContentGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  describe("handleChangeContentNote", () => {
    it("should call noteService.handleContentChanges and emit update", async () => {
      const mockClient = {
        data: {
          user: { _id: "user123" },
        },
        to: jest.fn().mockReturnThis(),
        emit: jest.fn(),
      } as any;

      const mockBody = {
        node_id: "node123",
        content: "new content",
      };

      mockNotesService.handleContentChanges.mockResolvedValue("new content");

      await gateway.handleChangeContentNote(mockClient, mockBody);

      expect(mockNotesService.handleContentChanges).toHaveBeenCalledWith(
        "user123",
        "new content",
        "node123",
      );
      expect(mockClient.to).toHaveBeenCalledWith("note:node123");
      expect(mockClient.emit).toHaveBeenCalledWith(
        "user-update-content",
        "new content",
      );
    });
  });
});
