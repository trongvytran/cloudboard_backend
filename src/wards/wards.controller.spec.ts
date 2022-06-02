import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WardsController } from './wards.controller';
import { WardsService } from './wards.service';
import { Ward } from './entities/ward.entity';

describe('WardsController', () => {
  let controller: WardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WardsController],
      providers: [
        WardsService,
        {
          provide: getRepositoryToken(Ward),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<WardsController>(WardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
