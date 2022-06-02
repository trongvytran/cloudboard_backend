import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WardsService } from './wards.service';
import { Ward } from './entities/ward.entity';

describe('WardsService', () => {
  let service: WardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WardsService,
        {
          provide: getRepositoryToken(Ward),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<WardsService>(WardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
