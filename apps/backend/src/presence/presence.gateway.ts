import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
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
export class PresenceGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
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
  async handleDisconnect(client: AuthenticatedSocket) {
    try {
      const userId = client.data.user?._id;

      const noteId = client.handshake.headers.note_id as string;

      if (!userId || !noteId) {
        return;
      }

      const removedUser = await this.presenceService.removeActiveUser(
        userId,
        noteId,
      );

      if (!removedUser) {
        return;
      }

      client.to(`note:${noteId}`).emit("remove-active-user", userId);
    } catch (error) {
      console.error("Disconnect Error:", error);
    }
  }

  async handleConnection(client: AuthenticatedSocket) {
    const userId = client.data.user._id;
    const noteId: any = client.handshake.headers.note_id;
    if (!userId || !noteId) {
      throw new WsException("Missing data");
    }
    await client.join(`note:${noteId}`);
    const me = await this.presenceService.addActiveUser(userId, noteId);
    const users: ActiveUser[] =
      await this.presenceService.getSetMembers(noteId);
    client.emit("all-online-users", users);
    client.to(`note:${noteId}`).emit("add-active-user", me);
  }
}
