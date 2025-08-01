import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
   const app = await NestFactory.create(AppModule, {});

  app.enableCors({
    origin: [process.env.FRONTEND_DOMAIN], 
    credentials: true, // important for sending/receiving cookies
  });
  await app.listen(process.env.PORT ?? 80);
}
bootstrap();
