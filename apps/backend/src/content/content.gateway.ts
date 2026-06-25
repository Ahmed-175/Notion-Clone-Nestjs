import { WebSocketGateway } from "@nestjs/websockets";
import { ContentService } from "./content.service";

@WebSocketGateway({
  namespace: "/note",
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
})
export class ContentGateway {
  constructor(
    private readonly contentService: ContentService,
    // private readonly noteService: NotesService,
  ) {}
}
