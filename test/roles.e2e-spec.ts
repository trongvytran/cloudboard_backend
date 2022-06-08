import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('RolesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
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
  });

  it('/api/roles/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/roles/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ id: 1, name: 'Admin' });
  });

  it('/api/roles (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/roles')
      .send({ name: 'System' })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toEqual({ id: 3, name: 'System' });
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
