import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder();
  config
    .setTitle('Notion Clone API')
    .setDescription('API documentation for Notion clone project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const docs = SwaggerModule.createDocument(app, config as any);
  SwaggerModule.setup('docs', app, docs);
  app.enableCors({
    origin: ['http://localhost:3000'],
  });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
