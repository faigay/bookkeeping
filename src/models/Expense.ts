import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  supplier: { type: String, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  receiptFile: { type: String }
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
