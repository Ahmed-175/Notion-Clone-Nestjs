import { Module } from "@nestjs/common";
import { ContentService } from "./content.service";
import { ContentGateway } from "./content.gateway";
import { NotesModule } from "src/notes/notes.module";

@Module({
  imports: [NotesModule],
  providers: [ContentGateway, ContentService],
})
export class ContentModule {}
