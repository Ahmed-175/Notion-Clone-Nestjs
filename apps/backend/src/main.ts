import { Logger } from "@nestjs/common";
import { createApp } from "./app";
import { RedisIoAdapter } from "./redis/adapters/redis.adapter";

async function bootstrap() {
  const logger = new Logger();
  const app = await createApp();

  const redisAdapter = app.get(RedisIoAdapter);

  redisAdapter.connectToRedis();

  app.useWebSocketAdapter(redisAdapter);
  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  logger.log(`server start running on port ${port}`);
}

bootstrap();
