import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { City } from '../src/cities/entities/city.entity';

describe('RolesController (e2e)', () => {
  let app: INestApplication;
  let cityRepository: Repository<City>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [{ provide: getRepositoryToken(City), useValue: {} }],
    }).compile();

    app = moduleFixture.createNestApplication();
    cityRepository = moduleFixture.get(getRepositoryToken(City));
    app.setGlobalPrefix('api');

    // Insert mock data to database
    cityRepository.insert([
      {
        name: 'Ho Chi Minh',
      },
    ]);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/cities (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/cities')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body).toStrictEqual([{ id: 1, name: 'Ho Chi Minh' }]);
  });

  it('/api/cities/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/cities/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toStrictEqual({ id: 1, name: 'Ho Chi Minh' });
  });

  it('/api/cities (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/cities')
      .send({ name: 'Da Nang' })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toStrictEqual({ id: 2, name: 'Da Nang' });
  });

  it('/api/cities/1 (PUT)', async () => {
    await request(app.getHttpServer())
      .put('/api/cities/1')
      .send({ name: 'Ha Noi' })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/api/cities/1 (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete('/api/cities/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
