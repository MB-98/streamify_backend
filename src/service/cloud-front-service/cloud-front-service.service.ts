import { Injectable } from '@nestjs/common';
import { getSignedCookies } from 'aws-cloudfront-sign';

@Injectable()
export class CloudFrontServiceService {

  generateSignedCookiesForAllVideos() {
    const expires = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour validity
    return getSignedCookies(process.env.AWS_CLOUDFRONT_URL! + '/*', {
        keypairId: process.env.AWS_CLOUDFRONT_KEY_PAIR_ID!,
        privateKeyString: process.env.AWS_CLOUDFRONT_PRIVATE_KEY! ,
        expireTime: expires * 1000,
    });
    }
}