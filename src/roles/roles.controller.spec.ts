import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const mockResult = [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'User' },
    ] as unknown as Promise<Role[]>;
    it('should return an array of roles', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => mockResult);
      expect(await controller.findAll()).toBe(mockResult);
    });
  });

  describe('findOne', () => {
    const mockResult = { id: 1, name: 'Admin' } as unknown as Promise<Role>;
    it('should return a role with id = 1', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => mockResult);
      expect(await controller.findOne('1')).toBe(mockResult);
    });
  });
});
