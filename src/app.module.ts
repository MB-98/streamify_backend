import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { CloudFrontServiceService } from './service/cloud-front-service/cloud-front-service.service';

@Module({
  imports: [MovieModule],
  controllers: [AppController],
  providers: [
    AppService,
    CloudFrontServiceService
  ],
})
export class AppModule {}
