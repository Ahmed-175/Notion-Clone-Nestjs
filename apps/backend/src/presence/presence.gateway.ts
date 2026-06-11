import {
  ConnectedSocket,
  MessageBody,
  // OnGatewayConnection,
  // OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from "@nestjs/websockets";
import { PresenceService } from "./presence.service";
import { Server } from "socket.io";
import type { AuthenticatedSocket } from "src/common/types/AuthenticatedSocket.type";
import { ActiveUser } from "./dto/ActiveUser.dto";
import { WsAuthService } from "src/common/middlewares/ws-auth.service";
@WebSocketGateway({
  namespace: "/note",
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
})
export class PresenceGateway implements OnGatewayInit {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly wsAuthService: WsAuthService,
  ) {}
  afterInit(server: Server) {
    server.use((socket, next) => {
      try {
        this.wsAuthService.authenticate(socket as AuthenticatedSocket);
        next();
      } catch (error) {
        console.error(error);
        next(new Error("Unauthorized"));
      }
    });
  }

  @SubscribeMessage("join-note")
  async handelJoinNote(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() body: { note_id: string },
  ) {
    const userId = client.data.user._id;
    if (!userId || !body.note_id) {
      throw new WsException("Missing data");
    }
    await client.join(`note:${body.note_id}`);
    const me = await this.presenceService.addActiveUser(userId, body.note_id);
    const users: ActiveUser[] = await this.presenceService.getSetMembers(
      body.note_id,
    );
    client.emit("all-online-users", users);
    client.to(`note:${body.note_id}`).emit("add-active-user", me);
  }
  @SubscribeMessage("leave-note")
  async handleLeaveNote(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() body: { note_id: string | null },
  ) {
    if (!body.note_id) {
      throw new WsException("note id does not provide");
    }
    await client.leave(`note:${body.note_id}`);
    await this.presenceService.removeActiveUser(
      client.data.user._id,
      body.note_id,
    );
    client.to(`note:${body.note_id}`).emit("user-leave", client.data.user._id);
  }
}
