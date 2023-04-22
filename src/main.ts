import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`server start on port ${process.env.APP_PORT}`);
  });
}
bootstrap();
