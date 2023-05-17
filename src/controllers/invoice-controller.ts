import { Request, Response } from 'express';
const db = require('../models/');

export const createInvoice = async (req: Request, res: Response) => {
  const { vatPercentage, totalAmount, vatAmount, clientId } = req.body;

  try {
    const newInvoice = await db.invoices.create({
      vatPercentage: 0,
      totalAmount: 0.0,
      vatAmount: 0.0,
      clientId,
    });

    return res.json({ data: newInvoice, message: `Invoice created succesfully` });
  } catch(err) {
    console.log(err)
    res.json(err.name);
  }
}

export const saveInvoice = async (req: Request, res: Response) => {
  const { invoiceId } = req.params;

  const updateData = {
    saved: true
  }

  try {
    await db.invoices.update(updateData, {
      where: {
        id: invoiceId
      }
    });

    return res.json({ message: `Invoice updated succesfully` });
  } catch(err) {
    console.log(err)
    res.json(err.name);
  }
}

export const deleteInvoice = async (req: Request, res: Response) => {
  const { invoiceId } = req.params;

  try {
    await db.invoices.destroy({
      where: {
        id: invoiceId
      }
    })

    return res.json({ message: `Invoice deleted succesfully` });
  } catch(err) {
    console.log(err)
    res.json(err.name);
  }
}

export const getInvoiceDetails = async (req: Request, res: Response) => {
  const { invoiceId } = req.params;

  try {
    const invoiceDetails = await db.invoices.findByPk(invoiceId, {
      attributes: {
        exclude: ['clientId', 'updatedAt']
      },
      include: [
        { 
          model: db.clients,
          include: [
            { model: db.countries }
          ] 
        }
      ]
    });

    const invoiceEntries = await invoiceDetails.getInvoice_entries({
      joinTableAttributes: [],
      attributes: {
        exclude: ['userId', 'projectId', 'invoiceId']
      },
      include: [
        { 
          model: db.users,
          attributes: {
            exclude: ['password', 'userType', 'userRole', 'contractStartDate', 'contractEndDate', 'createdAt', 'updatedAt']
          } 
        },
        { 
          model: db.projects,
          attributes: {
            exclude: ['projectType']
          } 
        }
      ],
    });

    return res.json({ data: { ...invoiceDetails.toJSON(), entries: invoiceEntries }, message: `Get Entry` });
  } catch(err) {
    console.log(err)
    res.json(err.name);
  }
}

export const addInvoiceEntry = async (req: Request, res: Response) => {
  const { totalHours, pricePerHour, userId, projectId, invoiceId } = req.body;

  try {
    const newEntry = await db.invoice_entry.create({
      totalHours,
      pricePerHour,
      userId,
      projectId,
      invoiceId
    });

    return res.json({ data: newEntry, message: `Entry added succesfully` });
  } catch (err) {
    console.log(err)
    res.json(err.name);
  }
};

export const listInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await db.invoices.findAll({
      attributes: {
        exclude: ['clientId']
      },
      include: [
        { model: db.clients }
      ]
    });

    return res.json({ data: invoices, message: `Invoices List` });
  } catch (err) {
    console.log(err)
    res.json(err.name);
  }
}