import { Test, TestingModule } from '@nestjs/testing';
import { CloudFrontServiceService } from './cloud-front-service.service';

describe('CloudFrontServiceService', () => {
  let service: CloudFrontServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudFrontServiceService],
    }).compile();

    service = module.get<CloudFrontServiceService>(CloudFrontServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
