import { Injectable } from '@nestjs/common';
import { getSignedCookies } from 'aws-cloudfront-sign';
import { readFileSync } from 'fs';

@Injectable()
export class CloudFrontServiceService {

  generateSignedCookiesForAllVideos() {
    const privateKeyString = readFileSync(process.env.CLOUDFRONT_PRIVATE_KEY_PATH!, 'utf8');
    const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hour validity
    return getSignedCookies(process.env.CLOUDFRONT_URL! + '/*', {
        keypairId: process.env.CLOUDFRONT_KEY_PAIR_ID!,
        privateKeyString: privateKeyString,
        expireTime: expires * 1000,
    });
    }
}