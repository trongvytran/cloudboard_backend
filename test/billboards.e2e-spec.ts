import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BillboardsController (e2e)', () => {
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

  it('/api/billboards (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/billboards')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('/api/billboards/1 (GET)', async () => {
    await request(app.getHttpServer())
      .get('/api/billboards/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/api/billboards/1 (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete('/api/billboards/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
