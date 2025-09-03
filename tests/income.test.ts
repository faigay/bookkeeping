import request from 'supertest';
import app from '../src/server';

describe('Income API', () => {
	it('should run a sample test', () => {
		expect(true).toBe(true);
	});

	it('should create a new income record', async () => {
			const res = await request(app)
				.post('/api/income')
				.send({
					receiptNumber: '1001',
					date: '2025-08-26',
					client: {
						name: 'Test Client',
						email: 'test@example.com',
						phone: '0501234567'
					},
					amount: 1000,
					vatAmount: 170,
					totalAmount: 1170,
					paymentDetails: {
						method: 'cash',
						details: 'Paid in cash'
					},
					description: 'Test income'
				});
		expect(res.status).toBe(201);
		expect(res.body.success).toBe(true);
		expect(res.body.data.amount).toBe(1000);
	});
});
