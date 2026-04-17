import { Module } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PresenceGateway } from './presence.gateway';

@Module({
  providers: [PresenceGateway, PresenceService],
})
export class PresenceModule {}
