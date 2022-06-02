import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { Role } from '../src/roles/entities/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RolesController (e2e)', () => {
  let app: INestApplication;
  let roleRepository: Repository<Role>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [{ provide: getRepositoryToken(Role), useValue: {} }],
    }).compile();

    app = moduleFixture.createNestApplication();
    roleRepository = moduleFixture.get(getRepositoryToken(Role));
    app.setGlobalPrefix('api');

    // Insert mock data to database
    roleRepository.insert([
      {
        name: 'Admin',
      },
    ]);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/roles (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/roles')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body).toStrictEqual([{ id: 1, name: 'Admin' }]);
  });

  it('/api/roles/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/roles/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toStrictEqual({ id: 1, name: 'Admin' });
  });

  it('/api/roles (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/roles')
      .send({ name: 'User' })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toStrictEqual({ id: 2, name: 'User' });
  });

  it('/api/roles/1 (PUT)', async () => {
    await request(app.getHttpServer())
      .put('/api/roles/1')
      .send({ name: 'Admin1' })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/api/roles/1 (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete('/api/roles/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
