import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as fs from 'fs';

async function bootstrap() {
/*
  const httpsOptions = {
    key: fs.readFileSync('src/secret/domain_ssl_key/local.marcobarden.de-key.pem'),
    cert: fs.readFileSync('src/secret/domain_ssl_key/local.marcobarden.de.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  */

   const app = await NestFactory.create(AppModule, {});

  app.enableCors({
    origin: [process.env.FRONTEND_DOMAIN], 
    credentials: true, // very important for sending/receiving cookies
  });
  await app.listen(process.env.PORT ?? 80);
}
bootstrap();
