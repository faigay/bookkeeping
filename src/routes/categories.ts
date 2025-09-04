import express from 'express';
import Category from '../models/Category';

const router = express.Router();


// POST /api/categories - Create a new category
router.post('/', async (req, res) => {
	const { name, type } = req.body;
	if (!name || !type) {
		return res.status(400).json({ success: false, error: 'Missing required fields: name, type' });
	}
	try {
		const category = new Category({ name, type });
		await category.save();
		res.status(201).json({ success: true, data: category });
	} catch (error) {
		const errMsg = (error instanceof Error) ? error.message : String(error);
		res.status(500).json({ success: false, error: errMsg });
	}
});

export default router;