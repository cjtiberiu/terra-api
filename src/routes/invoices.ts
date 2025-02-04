import { Router } from 'express';
import { addInvoiceEntry, createInvoice, deleteInvoice, getClientInvoiceData, getInvoiceDetails, listInvoices, saveInvoice } from '../controllers/invoice-controller';
import { adminCheck } from '../middleware/adminCheck';
import { authToken } from '../middleware/tokenCheck';

export const invoices: Router = Router();

invoices.post('/invoices/create', authToken, adminCheck, createInvoice);
invoices.put('/invoices/save/:invoiceId', authToken, adminCheck, saveInvoice);
invoices.delete('/invoices/delete/:invoiceId', authToken, adminCheck, deleteInvoice);
invoices.post('/invoices/addentry', authToken, adminCheck, addInvoiceEntry);
invoices.get('/invoices/get/:invoiceId', authToken, adminCheck, getInvoiceDetails);
invoices.get('/getinvoices', authToken, adminCheck, listInvoices);
invoices.get('/invoices/clientdata', authToken, adminCheck, getClientInvoiceData);