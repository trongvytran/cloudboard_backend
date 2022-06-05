import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../src/roles/entities/role.entity';
import { Ward } from '../src/wards/entities/ward.entity';
import { District } from '../src/districts/entities/district.entity';
import { City } from '../src/cities/entities/city.entity';
import { Billboard } from '../src/billboards/entities/billboard.entity';

describe('BillboardsController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let wardRepository: Repository<Ward>;
  let districtRepository: Repository<District>;
  let cityRepository: Repository<City>;
  let billboardRepository: Repository<Billboard>;
  let mockBillboard: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        { provide: getRepositoryToken(Billboard), useValue: {} },
        { provide: getRepositoryToken(Role), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: getRepositoryToken(Ward), useValue: {} },
        { provide: getRepositoryToken(District), useValue: {} },
        { provide: getRepositoryToken(City), useValue: {} },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    billboardRepository = moduleFixture.get(getRepositoryToken(Billboard));
    userRepository = moduleFixture.get(getRepositoryToken(User));
    roleRepository = moduleFixture.get(getRepositoryToken(Role));
    wardRepository = moduleFixture.get(getRepositoryToken(Ward));
    districtRepository = moduleFixture.get(getRepositoryToken(District));
    cityRepository = moduleFixture.get(getRepositoryToken(City));
    app.setGlobalPrefix('api');

    await roleRepository.insert([
      {
        name: 'Admin',
      },
      {
        name: 'User',
      },
    ]);

    await cityRepository.insert([{ name: 'Ho Chi Minh' }, { name: 'Ha Noi' }]);
    await districtRepository.insert([
      { name: '1', city: { id: 1, name: 'Ho Chi Minh' } },
      { name: '2', city: { id: 1, name: 'Ho Chi Minh' } },
    ]);

    await wardRepository.insert([
      { name: 'Da Kao', district: { id: 1, name: '1' } },
      { name: 'Ben Thanh', district: { id: 1, name: '1' } },
    ]);

    const userRole = await roleRepository.findOne({ where: { name: 'User' } });
    const user = {
      name: 'Hoang An Le Ba',
      email: 'hoanganleba@gmail.com',
      imageUrl: 'https://www.w3schools.com/howto/img_avatar.png',
      role: userRole,
    };
    await userRepository.save(user);
    const mockCity = await cityRepository.findOne({
      where: { name: 'Ho Chi Minh' },
    });
    const mockUser = await userRepository.findOne({
      where: { email: 'hoanganleba@gmail.com' },
    });
    const mockDistrict = await districtRepository.findOne({
      where: { name: '1' },
    });
    const mockWard = await wardRepository.findOne({
      where: { name: 'Da Kao' },
    });
    mockBillboard = {
      lat: -42.44713,
      long: -169.53328,
      name: 'Vy Tran',
      description:
        'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
      height: 14,
      width: 48,
      address: '123 Le Duan St.',
      price: '115,000,000₫ - 160,000,000₫',
      imageUrl: 'https://picsum.photos/id/11/200/300',
      videoUrl:
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
      duration: '6 months',
      expiredAt: new Date(),
      city: mockCity,
      user: mockUser,
      district: mockDistrict,
      ward: mockWard,
    };
    await billboardRepository.save(mockBillboard);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/billboards (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/billboards')
      .expect('Content-Type', /json/)
      .expect(200);

    mockBillboard.expiredAt = expect.any(String);
    mockBillboard.city = expect.any(Object);
    mockBillboard.user = expect.any(Object);
    mockBillboard.district = expect.any(Object);
    mockBillboard.ward = expect.any(Object);
    mockBillboard.subscription = null;
    mockBillboard.createdAt = expect.any(String);
    mockBillboard.updatedAt = expect.any(String);
    expect(response.body).toMatchObject([mockBillboard]);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('/api/billboards/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/billboards/1')
      .expect('Content-Type', /json/)
      .expect(200);

    mockBillboard.expiredAt = expect.any(String);
    mockBillboard.city = expect.any(Object);
    mockBillboard.user = expect.any(Object);
    mockBillboard.district = expect.any(Object);
    mockBillboard.ward = expect.any(Object);
    mockBillboard.subscription = null;
    mockBillboard.createdAt = expect.any(String);
    mockBillboard.updatedAt = expect.any(String);
    expect(response.body).toMatchObject(mockBillboard);
  });

  it('/api/billboards/1 (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete('/api/billboards/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
