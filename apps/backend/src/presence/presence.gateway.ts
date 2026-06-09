import { WebSocketGateway } from "@nestjs/websockets";
import { PresenceService } from "./presence.service";

@WebSocketGateway({
  namespace: "/realtime",
})
export class PresenceGateway {
  constructor(private readonly presenceService: PresenceService) {}
}
