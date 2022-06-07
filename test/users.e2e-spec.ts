import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../src/roles/entities/role.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        { provide: getRepositoryToken(Role), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get(getRepositoryToken(User));
    roleRepository = moduleFixture.get(getRepositoryToken(Role));
    app.setGlobalPrefix('api');

    await roleRepository.insert([
      {
        name: 'Admin',
      },
      {
        name: 'User',
      },
    ]);

    const userRole = await roleRepository.findOne({ where: { name: 'User' } });
    const mockUser = {
      name: 'Hoang An Le Ba',
      email: 'hoanganleba@gmail.com',
      imageUrl: 'https://www.w3schools.com/howto/img_avatar.png',
      role: userRole,
    };
    await userRepository.save(mockUser);
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
  });

  it('/api/users/1 (GET)', async () => {
    await request(app.getHttpServer())
      .get('/api/users/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/api/users/1 (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete('/api/users/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
