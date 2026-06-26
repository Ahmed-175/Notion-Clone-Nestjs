import { createApp } from "./app";
import { RedisIoAdapter } from "./redis/adapters/redis.adapter";

async function bootstrap() {
  const app = await createApp();

  const redisAdapter = app.get(RedisIoAdapter);

  await redisAdapter.connectToRedis();

  app.useWebSocketAdapter(redisAdapter);

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
