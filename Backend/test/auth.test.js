const request = require('supertest');
const app = require('../app'); // Your Express app
const { sequelize } = require('../config/sqlDB');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset test DB
});

describe('Auth Flow', () => {
  let token;

  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(201);
  });

  it('should login user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(200);
    token = res.body.token;
  });

  it('should block protected route without token', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.statusCode).toBe(401);
  });
});
