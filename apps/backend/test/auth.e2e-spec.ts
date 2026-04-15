import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';
describe('Auth Module E2E Testing', () => {
  let app: INestApplication;
  let token: string;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Register test  auth/register', async () => {
    const res = await request(app.getHttpServer()).post('/auth/register').send({
      username: 'test123',
      email: 'test@gmail.com',
      password: '12345',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
  });

  it('Login testing  auth/login', async () => {
    const res = await request(app.getHttpServer()).post('/auth/login').send({
      email: 'test@gmail.com',
      password: '12345',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');

    token = res.body.token;
  });

  it('Auth Me testing auth/me', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth/me')
      .set({
        authorization: `Bearer ${token}`,
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('username');
  });

  afterAll(async () => {
    await app.close();
  });
});
