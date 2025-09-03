import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  receiptNumber: { type: String, required: true },
  date: { type: Date, required: true },
  client: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  amount: { type: Number, required: true },
  vatAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentDetails: {
    method: { type: String, required: true },
    details: { type: String }
  },
  description: { type: String }
});

const Income = mongoose.model('Income', incomeSchema);
export default Income;
