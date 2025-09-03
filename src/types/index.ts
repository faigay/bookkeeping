export enum PaymentMethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  CHECK = 'check',
  BANK_TRANSFER = 'bank_transfer'
}

export interface PaymentDetails {
  method: PaymentMethod;
  amount: number;
  creditCard?: {
    lastFourDigits: string;
  };
  check?: {
    checkNumber: string;
    accountNumber: string;
    branch: string;
    bank: string;
    checkDate: Date;
  };
  bankTransfer?: {
    accountNumber: string;
    branch: string;
    bank: string;
    transferDate: Date;
  };
}

export interface Client {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  vatId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Supplier {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  vatId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Income {
  receiptNumber: string;
  date: Date;
  client: string | Client;
  amount: number;
  vatAmount: number;
  totalAmount: number;
  paymentDetails: PaymentDetails;
  description: string;
  receiptSent?: boolean;
  receiptPath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Expense {
  referenceNumber: string;
  amount: number;
  vatAmount: number;
  totalAmount: number;
  supplier: string | Supplier;
  date: Date;
  paymentDetails: PaymentDetails;
  category: string | Category;
  documentPath?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
