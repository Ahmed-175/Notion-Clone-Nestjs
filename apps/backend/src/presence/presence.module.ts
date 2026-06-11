import { Module } from "@nestjs/common";
import { PresenceService } from "./presence.service";
import { PresenceGateway } from "./presence.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "src/users/schemas/user.schema";
import { WsAuthService } from "src/common/middlewares/ws-auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    JwtModule,
  ],
  providers: [PresenceGateway, PresenceService, WsAuthService],
})
export class PresenceModule {}
