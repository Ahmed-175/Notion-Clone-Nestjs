import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as cookie from "cookie";

import { AuthenticatedSocket } from "../types/AuthenticatedSocket.type";
import { JwtPayload } from "../types/jwtPayload.type";

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient<AuthenticatedSocket>();

    const rawCookies = client.handshake.headers.cookie;

    if (!rawCookies) {
      throw new UnauthorizedException("No cookies provided");
    }

    const cookies = cookie.parse(rawCookies);
    const token = cookies.access_token;

    console.log(token);

    if (!token) {
      throw new UnauthorizedException("No access token provided");
    }
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      console.log("payload : ", payload);

      client.data.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException("Invalid access token");
    }
  }
}
