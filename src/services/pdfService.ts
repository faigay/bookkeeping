import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { Income } from '../types';

// Ensure receipts directory exists
const receiptsDir = 'uploads/receipts';
if (!fs.existsSync(receiptsDir)) {
  fs.mkdirSync(receiptsDir, { recursive: true });
}

export const generateReceiptPDF = async (income: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Create PDF document
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      
      // Generate filename
      const filename = `receipt-${income.receiptNumber}-${Date.now()}.pdf`;
      const filePath = path.join(receiptsDir, filename);
      
      // Pipe PDF to file
      doc.pipe(fs.createWriteStream(filePath));

      // Add Hebrew font support (if available)
      // Note: You'll need to add Hebrew font files to support Hebrew text
      
    // Header
    doc.fontSize(20)
      .text('Receipt', 50, 50, { align: 'center' });

    // Company information
    doc.fontSize(12)
      .text(`${process.env.COMPANY_NAME || 'Your Company Name'}`, 50, 100)
      .text(`${process.env.COMPANY_ADDRESS || 'Company Address'}`, 50, 115)
      .text(`${process.env.COMPANY_PHONE || 'Company Phone'}`, 50, 130)
      .text(`${process.env.COMPANY_EMAIL || 'company@email.com'}`, 50, 145)
      .text(`VAT ID: ${process.env.COMPANY_VAT_ID || 'VAT ID'}`, 50, 160);

    // Receipt details
    doc.fontSize(14)
      .text(`Receipt Number: ${income.receiptNumber}`, 50, 200)
      .text(`Date: ${new Date(income.date).toLocaleDateString('en-US')}`, 50, 220);

    // Client information
    doc.fontSize(12)
      .text('Client Information:', 50, 260)
      .text(`Name: ${income.client.name}`, 70, 280)
      .text(`Email: ${income.client.email || 'N/A'}`, 70, 295)
      .text(`Phone: ${income.client.phone || 'N/A'}`, 70, 310);

    // Payment details
    const paymentDetails = income.paymentDetails || {};
    const amount = typeof income.amount === 'number' ? income.amount : 0;
    const vatAmount = typeof income.vatAmount === 'number' ? income.vatAmount : 0;
    const totalAmount = typeof income.totalAmount === 'number' ? income.totalAmount : amount + vatAmount;

    doc.text('Payment Details:', 50, 350)
      .text(`Method: ${paymentDetails.method || 'N/A'}`, 70, 370)
      .text(`Amount: $${amount.toFixed(2)}`, 70, 385)
      .text(`VAT: $${vatAmount.toFixed(2)}`, 70, 400);

    doc.fontSize(14)
      .text(`Total: $${totalAmount.toFixed(2)}`, 70, 415);
      
      doc.fontSize(12); // Reset font size

      // Description
      if (income.description) {
        doc.text('Description:', 50, 455)
           .text(income.description, 70, 475, { width: 400 });
      }

      // Payment method specific details
      let yPosition = 520;
      if (income.paymentDetails.creditCard) {
        doc.text(`Credit Card (****${income.paymentDetails.creditCard.lastFourDigits})`, 70, yPosition);
        yPosition += 15;
      } else if (income.paymentDetails.check) {
        const check = income.paymentDetails.check;
        doc.text(`Check Details:`, 70, yPosition)
           .text(`Check Number: ${check.checkNumber}`, 90, yPosition + 15)
           .text(`Bank: ${check.bank}`, 90, yPosition + 30)
           .text(`Branch: ${check.branch}`, 90, yPosition + 45)
           .text(`Account: ${check.accountNumber}`, 90, yPosition + 60);
        yPosition += 90;
      } else if (income.paymentDetails.bankTransfer) {
        const transfer = income.paymentDetails.bankTransfer;
        doc.text(`Bank Transfer Details:`, 70, yPosition)
           .text(`Bank: ${transfer.bank}`, 90, yPosition + 15)
           .text(`Branch: ${transfer.branch}`, 90, yPosition + 30)
           .text(`Account: ${transfer.accountNumber}`, 90, yPosition + 45);
        yPosition += 75;
      }

      // Footer
      doc.fontSize(10)
         .text('Thank you for your business!', 50, yPosition + 30)
         .text('תודה על העסק!', 50, yPosition + 45);

      // Finalize PDF
      doc.end();

      // Wait for PDF to be written
      doc.on('end', () => {
        resolve(`uploads/receipts/${filename}`);
      });

  doc.on('error', (error: Error) => {
        reject(error);
      });

    } catch (error) {
      reject(error);
    }
  });
};