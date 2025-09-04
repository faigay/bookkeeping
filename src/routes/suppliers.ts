import express from 'express';
import Supplier from '../models/Supplier';

const router = express.Router();


// POST /api/suppliers - Create a new supplier
router.post('/', async (req, res) => {
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		return res.status(400).json({ success: false, error: 'Missing required fields: name, email, phone' });
	}
	try {
		const supplier = new Supplier({ name, email, phone });
		await supplier.save();
		res.status(201).json({ success: true, data: supplier });
	} catch (error) {
		const errMsg = (error instanceof Error) ? error.message : String(error);
		res.status(500).json({ success: false, error: errMsg });
	}
});

export default router;