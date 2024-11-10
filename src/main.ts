import { NestFactory } from '@nestjs/core';
import { AppModule, getEnvPath } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(AppModule.port);
}

bootstrap();
