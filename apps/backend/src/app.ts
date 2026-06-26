import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { join } from "path";

import { AppModule } from "./app.module";
import { setupSwagger } from "./common/docs/swagger.docs";

export async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  app.setGlobalPrefix("api");

  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/api/uploads/",
  });
  setupSwagger(app);

  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  return app;
}
