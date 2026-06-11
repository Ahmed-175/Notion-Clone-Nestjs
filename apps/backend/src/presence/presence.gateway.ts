import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from "@nestjs/websockets";
import { PresenceService } from "./presence.service";
import { Server, Socket } from "socket.io";
// import { UseGuards } from "@nestjs/common";
// import { WsJwtGuard } from "src/common/guards/ws-jwt.guard";
import type { AuthenticatedSocket } from "src/common/types/AuthenticatedSocket.type";
import { ActiveUser } from "./dto/ActiveUser.dto";
import { WsAuthService } from "src/common/middlewares/ws-auth.service";

// @UseGuards(WsJwtGuard)
@WebSocketGateway({
  namespace: "/note",
  cors: {
    origin: "http://localhost:5173",
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
  @WebSocketServer()
  server: Server;
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
  handleDisconnect(client: Socket) {}
  async handleConnection(client: AuthenticatedSocket) {
    const userId = client.data.user._id;
    const noteId = client.handshake.auth.noteId;
    console.log("noteId : ", noteId);
    console.log("userId : ", userId);
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
