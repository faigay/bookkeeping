import request from 'supertest';
import app from '../src/server';

test('sample test works', () => {
  expect(2 + 2).toBe(4);
});

describe('Expense API', () => {
  it('should create a new expense record', async () => {
    const res = await request(app)
      .post('/api/expenses')
      .send({
        amount: 500,
        supplier: 'some-supplier-id',
        category: 'some-category-id',
        paymentMethod: 'cash',
        date: '2025-08-26',
        description: 'Test expense'
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.amount).toBe(500);
  });
});
