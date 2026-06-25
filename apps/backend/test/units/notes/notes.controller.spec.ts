import { Test, TestingModule } from "@nestjs/testing";
import { NotesController } from "../../../src/notes/notes.controller";
import { NotesService } from "../../../src/notes/services/notes.service";

describe("NotesController", () => {
  let controller: NotesController;
  let service: NotesService;

  const mockNotesService = {
    findByNodeId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: mockNotesService,
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getNote", () => {
    it("should return note by id", async () => {
      const noteId = "note-123";
      const expectedResult = { _id: noteId, content: "Test content" };
      mockNotesService.findByNodeId.mockResolvedValue(expectedResult);

      const result = await controller.getNote(noteId);

      expect(service.findByNodeId).toHaveBeenCalledWith(noteId);
      expect(result).toEqual(expectedResult);
    });
  });
});
