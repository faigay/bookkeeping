
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import clientsRouter from './routes/clients';
import suppliersRouter from './routes/suppliers';
import categoriesRouter from './routes/categories';
import incomeRouter from './routes/income';
import expensesRouter from './routes/expenses';

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/bookkeeping';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: any) => console.error('MongoDB connection error:', err));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Bookkeeping API is running');
});

app.use('/api/clients', clientsRouter);
app.use('/api/suppliers', suppliersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/income', incomeRouter);
app.use('/api/expenses', expensesRouter);

export default app;

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
