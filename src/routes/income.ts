import express from 'express';
import { generateReceiptPDF } from '../services/pdfService';
import Income from '../models/Income';

const router = express.Router();

// Create income and generate PDF receipt
router.post('/', async (req, res) => {
	try {
		const income = req.body;
		const requiredFields = ['receiptNumber', 'date', 'client', 'amount', 'vatAmount', 'totalAmount', 'paymentDetails'];
		for (const field of requiredFields) {
			if (!income[field]) {
				return res.status(400).json({ success: false, error: `Missing required field: ${field}` });
			}
		}
		const newIncome = new Income(income);
		await newIncome.save();
		const pdfPath = await generateReceiptPDF(income);
		res.status(201).json({ success: true, data: newIncome, pdf: pdfPath });
	} catch (error) {
		console.error('Income route error:', error);
		const errMsg = (error instanceof Error) ? error.message : String(error);
		res.status(500).json({ error: errMsg });
	}
});


// GET /api/income - Get all income records
router.get('/', async (req, res) => {
	try {
		const incomes = await Income.find();
		res.json({ success: true, data: incomes });
	} catch (error) {
		const errMsg = (error instanceof Error) ? error.message : String(error);
		res.status(500).json({ success: false, error: errMsg });
	}
});

export default router;