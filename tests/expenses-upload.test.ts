import request from 'supertest';
import app from '../src/server';
import path from 'path';

describe('Expense Receipt Upload', () => {
  it('should upload a receipt file and return filename and path', async () => {
    const res = await request(app)
      .post('/api/expenses/upload')
      .attach('receipt', path.join(__dirname, 'fixtures', 'test-receipt.png'));
    expect(res.status).toBe(200);
    expect(res.body.filename).toBeDefined();
    expect(res.body.path).toContain('uploads/receipts');
  });
});