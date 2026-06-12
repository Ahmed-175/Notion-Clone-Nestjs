import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { ContentService } from "./content.service";
import type { AuthenticatedSocket } from "src/common/types/AuthenticatedSocket.type";
import { NotesService } from "src/notes/notes.service";

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
    private readonly noteService: NotesService,
  ) {}

  @SubscribeMessage("edit-content-note")
  async handleChangeContentNote(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    body: {
      node_id: string;
      content: string;
    },
  ) {
    console.log(body);
    const updatecontent = await this.noteService.handleContentChanges(
      client.data.user._id,
      body.content,
      body.node_id,
    );

    client
      .to(`note:${body.node_id}`)
      .emit("user-update-content", updatecontent);
  }
}
