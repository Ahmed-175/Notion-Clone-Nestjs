import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import type { AuthenticatedSocket } from "src/common/types/AuthenticatedSocket.type";
import { PresenceService } from "./presence.service";
import { WsAuthService } from "src/common/middlewares/ws-auth.service";
import { ActiveUser } from "./dto/ActiveUser.dto";

@WebSocketGateway({
  namespace: "/note",
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
})
export class PresenceGateway implements OnGatewayInit, OnGatewayDisconnect {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly wsAuthService: WsAuthService,
  ) {}

  handleConnection(client: Socket) {
    console.log(
      `PID=${process.pid} PORT=${process.env.PORT} CLIENT=${client.id}`,
    );
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    const noteId = client.data.currentNote;
    client.leave(`note:${noteId}`);

    await this.presenceService.removeActiveUser(client.data.user._id, noteId);

    client
      .to(`note:${noteId}`)
      .emit("remove-active-user", client.data.user._id);
  }

  afterInit(server: Server) {
    server.use((socket, next) => {
      try {
        this.wsAuthService.authenticate(socket as AuthenticatedSocket);
        next();
      } catch (err) {
        next(new Error("Unauthorized"));
      }
    });
  }

  @SubscribeMessage("join-note")
  async handleJoinNote(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() noteId: string,
  ) {
    const userId = client.data.user._id;

    if (!userId || !noteId) {
      throw new WsException("Missing data");
    }

    client.join(`note:${noteId}`);
    client.data.currentNote = noteId;

    const me = await this.presenceService.addActiveUser(userId, noteId);

    const users: ActiveUser[] =
      await this.presenceService.getSetMembers(noteId);

    // send full list only to joining user
    client.emit("all-online-users", users);

    // notify others
    client.to(`note:${noteId}`).emit("add-active-user", me);
  }

  @SubscribeMessage("leave-note")
  async handleLeaveNote(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() noteId: string,
  ) {
    if (!noteId) {
      throw new WsException("note id not provided");
    }

    client.leave(`note:${noteId}`);

    await this.presenceService.removeActiveUser(client.data.user._id, noteId);

    client
      .to(`note:${noteId}`)
      .emit("remove-active-user", client.data.user._id);
  }
}
