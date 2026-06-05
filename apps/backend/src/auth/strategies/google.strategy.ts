import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
      callbackURL: "http://localhost:8000/api/auth/google/callback",
      scope: ["email", "profile"],
    });
  }
  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = {
      email: profile.emails[0].value,
      username: profile.displayName,
      picture: profile.photos[0].value,
      google_id: profile.id,
    };

    done(null, user);
  }
}
