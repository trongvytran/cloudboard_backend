import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DistrictsController } from './districts.controller';
import { DistrictsService } from './districts.service';
import { District } from './entities/district.entity';

describe('DistrictsController', () => {
  let controller: DistrictsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistrictsController],
      providers: [
        DistrictsService,
        {
          provide: getRepositoryToken(District),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DistrictsController>(DistrictsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
