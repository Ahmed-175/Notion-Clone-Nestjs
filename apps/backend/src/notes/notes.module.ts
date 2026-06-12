import { Module } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NotesController } from "./notes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Note, noteSchema } from "src/nodes/schemas/note.schema";
import { Node, nodeSchema } from "src/nodes/schemas/node.schema";

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
