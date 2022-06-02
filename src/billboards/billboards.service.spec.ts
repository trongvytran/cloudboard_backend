import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BillboardsService } from './billboards.service';
import { Billboard } from './entities/billboard.entity';

describe('BillboardsService', () => {
  let service: BillboardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillboardsService,
        {
          provide: getRepositoryToken(Billboard),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BillboardsService>(BillboardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
