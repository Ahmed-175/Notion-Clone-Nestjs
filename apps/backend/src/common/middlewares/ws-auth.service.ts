import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as cookie from "cookie";
import { AuthenticatedSocket } from "../types/AuthenticatedSocket.type";
import { JwtPayload } from "../types/jwtPayload.type";

@Injectable()
export class WsAuthService {
  constructor(private readonly jwtService: JwtService) {}

  authenticate(socket: AuthenticatedSocket): void {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.access_token;

    if (!token) {
      throw new Error("No token");
    }

    const payload = this.jwtService.verify<JwtPayload>(token, {
      secret: process.env.JWT_SECRET,
    });

    socket.data.user = payload;
  }
}
