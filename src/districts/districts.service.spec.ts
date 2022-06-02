import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DistrictsService } from './districts.service';
import { District } from './entities/district.entity';

describe('DistrictsService', () => {
  let service: DistrictsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistrictsService,
        {
          provide: getRepositoryToken(District),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DistrictsService>(DistrictsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
