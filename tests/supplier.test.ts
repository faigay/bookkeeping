import request from 'supertest';
import app from '../src/server';

describe('Supplier API', () => {
  it('should create a new supplier', async () => {
    const res = await request(app)
      .post('/api/suppliers')
      .send({
        name: 'Test Supplier',
        email: 'testsupplier@example.com',
        phone: '0509876543'
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Test Supplier');
  });
});
