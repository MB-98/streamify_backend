import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CloudFrontServiceService } from './service/cloud-front-service/cloud-front-service.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cloudFrontService: CloudFrontServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/session')
  setStreamingSession(@Res({ passthrough: true }) res: Response) {
    const cookies = this.cloudFrontService.generateSignedCookiesForAllVideos();
    const domain = process.env.CLOUDFRONT_DOMAIN;
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 Stunden ab jetzt

    res.cookie('CloudFront-Policy', cookies['CloudFront-Policy'], {
      httpOnly: false,
      path: '/',
      domain: domain,
      secure: true,
      expires: expires,
    });
    res.cookie('CloudFront-Key-Pair-Id', cookies['CloudFront-Key-Pair-Id'], {
      httpOnly: false,
      path: '/',
      domain: domain,
      secure: true,
      expires: expires,
    });
    res.cookie('CloudFront-Signature', cookies['CloudFront-Signature'], {
      httpOnly: false,
      path: '/',
      domain: domain,
      secure: true,
      expires: expires,
    });

    return { success: true };
  }
}
