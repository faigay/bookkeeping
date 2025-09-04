import express from 'express';
import Client from '../models/Client';

const router = express.Router();

// POST /api/clients - Create a new client
router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, error: 'Missing required fields: name, email, phone' });
  }
  try {
    const client = new Client({ name, email, phone });
    await client.save();
    res.status(201).json({ success: true, data: client });
  } catch (error) {
  const errMsg = (error instanceof Error) ? error.message : String(error);
  res.status(500).json({ success: false, error: errMsg });
  }
});

export default router;