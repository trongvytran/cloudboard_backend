import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
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

  it('/api/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        imageUrl: expect.any(String),
        billboards: expect.any(Array),
        subscriptions: expect.any(Array),
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        phoneNumber: expect.any(String),
        role: { id: expect.any(Number), name: 'User' },
      },
    ]);
  });

  it('/api/users/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/users/1')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
      imageUrl: expect.any(String),
      billboards: expect.any(Array),
      subscriptions: expect.any(Array),
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      phoneNumber: expect.any(String),
      role: { id: expect.any(Number), name: 'User' },
    });
  });

  it('/api/users/1 (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete('/api/users/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
