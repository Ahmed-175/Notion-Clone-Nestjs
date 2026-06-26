import { Module } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Node, nodeSchema } from "src/nodes/schemas/node.schema";
import { Note, noteSchema } from "./schema/note.schema";
import { NotesService } from "./services/notes.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: noteSchema }]),
    MongooseModule.forFeature([{ name: Node.name, schema: nodeSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
