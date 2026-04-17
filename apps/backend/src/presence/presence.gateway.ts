import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { PresenceService } from './presence.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PresenceGateway implements OnGatewayDisconnect {
  server: Server;
  constructor(private readonly presenceService: PresenceService) {}
  private userMap = new Map<string, { noteId: string; userId: string }>();

  @SubscribeMessage('join_note')
  async handleJoin(
    @MessageBody() data: { noteId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { noteId, userId } = data;
    client.join(noteId);
    this.userMap.set(client.id, { noteId, userId });
    const count = await this.presenceService.join(noteId, userId);

    this.server.to(noteId).emit('note_users_count', count);
  }

  @SubscribeMessage('leave_note')
  async handleLeave(@ConnectedSocket() client: Socket) {
    const data = this.userMap.get(client.id);
    if (!data) return;
    const { noteId, userId } = data;
    const count = await this.presenceService.leave(noteId, userId);
    this.server.to(noteId).emit('note_users_count', count);
    this.userMap.delete(client.id);
  }

  async handleDisconnect(client: any) {
    const data = this.userMap.get(client.id);
    if (!data) return;
    const { noteId, userId } = data;
    const count = await this.presenceService.leave(noteId, userId);

    this.server.to(noteId).emit('note_users_count', count);

    this.userMap.delete(client.id);
  }
}
