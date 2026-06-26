import { Controller, Get, Param } from "@nestjs/common";
import { NotesService } from "./services/notes.service";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(":id")
  async getNote(@Param("id") id: string) {
    return await this.notesService.findByNodeId(id);
  }
}
