import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     disableErrorMessages:
  //       process.env.NODE_ENV === 'production' ? true : false,
  //   }),
  // );
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
