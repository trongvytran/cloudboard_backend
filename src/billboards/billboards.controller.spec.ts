import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BillboardsController } from './billboards.controller';
import { BillboardsService } from './billboards.service';
import { Billboard } from './entities/billboard.entity';

describe('BillboardsController', () => {
  let controller: BillboardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillboardsController],
      providers: [
        BillboardsService,
        {
          provide: getRepositoryToken(Billboard),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BillboardsController>(BillboardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
