import request from 'supertest';
import app from '../src/server';

describe('Category API', () => {
  it('should create a new category', async () => {
    const res = await request(app)
      .post('/api/categories')
      .send({
        name: 'Test Category',
        type: 'income'
      });
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    // You may need to adjust this based on your actual response structure
  });
});
