import { INestApplication } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';
import request from 'supertest';

describe('Auth Module E2E Testing', () => {
  let app: INestApplication;
  let agent;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.use(cookieParser());

    await app.init();

    agent = request.agent(app.getHttpServer());
  });

  it('Register test auth/register', async () => {
    const res = await agent.post('/auth/register').send({
      username: 'test123',
      email: 'test@gmail.com',
      password: '123456',
    });

    console.log('REGISTER COOKIES:', res.headers['set-cookie']);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
  });

  it('Login testing auth/login', async () => {
    const res = await agent.post('/auth/login').send({
      email: 'test@gmail.com',
      password: '123456',
    });

    console.log('LOGIN COOKIES:', res.headers['set-cookie']);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
  });

  it('Auth Me testing auth/me', async () => {
    const res = await agent.get('/auth/me');

    console.log('ME BODY:', res.body);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('username');
  });

  afterAll(async () => {
    const connection = app.get(getConnectionToken());
    await connection.close();
    await app.close();
  });
});
