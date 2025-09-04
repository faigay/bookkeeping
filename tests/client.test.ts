import request from 'supertest';
import app from '../src/server';

describe('Client API', () => {
	it('should run a sample test', () => {
		expect(true).toBe(true);
	});

	it('should create a new client', async () => {
		const res = await request(app)
			.post('/api/clients')
			.send({
				name: 'Test Client',
				email: 'testclient@example.com',
				phone: '0501234567'
			});
		expect(res.status).toBe(201);
		expect(res.body.success).toBe(true);
		expect(res.body.data.name).toBe('Test Client');
	});
});