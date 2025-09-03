import express from 'express';
import upload from '../middleware/upload';
import Expense from '../models/Expense';

const router = express.Router();

// Upload expense receipt
router.post('/upload', upload.single('receipt'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'No file uploaded' });
	}
	// Normalize path separators for cross-platform compatibility
	const normalizedPath = req.file.path.replace(/\\/g, '/');
	res.status(200).json({ filename: req.file.filename, path: normalizedPath });
});



// GET /api/expenses - Get all expense records
router.get('/', async (req, res) => {
	try {
		const expenses = await Expense.find();
		res.json({ success: true, data: expenses });
	} catch (error) {
		const errMsg = (error instanceof Error) ? error.message : String(error);
		res.status(500).json({ success: false, error: errMsg });
	}
});

// POST /api/expenses - Create a new expense
router.post('/', async (req, res) => {
	const { amount, supplier, date, paymentMethod, category, description } = req.body;
	if (!amount || !supplier || !date || !paymentMethod || !category) {
		return res.status(400).json({ success: false, error: 'Missing required fields: amount, supplier, date, paymentMethod, category' });
	}
	try {
		const expense = new Expense({ amount, supplier, date, paymentMethod, category, description });
		await expense.save();
		res.status(201).json({ success: true, data: expense });
	} catch (error) {
		const errMsg = (error instanceof Error) ? error.message : String(error);
		res.status(500).json({ success: false, error: errMsg });
	}
});

export default router;