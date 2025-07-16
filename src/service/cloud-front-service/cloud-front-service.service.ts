import { Injectable } from '@nestjs/common';
import { getSignedCookies } from 'aws-cloudfront-sign';
import { readFileSync } from 'fs';

@Injectable()
export class CloudFrontServiceService {

  generateSignedCookiesForAllVideos(expireTimestamp: number) {
    const privateKeyString = readFileSync(process.env.CLOUDFRONT_PRIVATE_KEY_PATH!, 'utf8');
    return getSignedCookies(process.env.CLOUDFRONT_URL! + '/*', {
        keypairId: process.env.CLOUDFRONT_KEY_PAIR_ID!,
        privateKeyString: privateKeyString,
        expireTime: expireTimestamp,
    });
    }
}