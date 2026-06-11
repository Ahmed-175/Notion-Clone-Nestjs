import { Socket } from "socket.io";
import { JwtPayload } from "./jwtPayload.type";

export interface AuthenticatedSocket extends Socket {
  handshake: Socket["handshake"] & {
    auth: {
      token: string;
      noteId: string;
    };
  };
  data: {
    user: JwtPayload;
  };
}
