import { Request, Response } from 'express';
const { Op } = require('sequelize');
const db = require('../models/');

// TODO: security issue check, new approach needed when adding a new invoice
export const createInvoice = async (req: Request, res: Response) => {
  const { vatPercentage, clientId } = req.body;

  try {
    const newInvoice = await db.invoices.create({
      vatPercentage: vatPercentage ? vatPercentage : 0,
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

// TODO: security issue check, new approach needed when adding a new invoice
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
        { 
          model: db.clients,
          include: [
            { model: db.countries }
          ] 
        }
      ]
    });

    return res.json({ data: invoices, message: `Invoices List` });
  } catch (err) {
    console.log(err)
    res.json(err.name);
  }
}

// TODO: rename and move?
// security issue check, new approach needed when adding a new invoice
export const getClientInvoiceData = async (req: Request, res: Response) => {
  const { clientId, month, year } = req.query;

  const startDate = new Date(Number(year), Number(month) - 1, 1);
  const endDate = new Date(Number(year), Number(month), 0);

  try {
    const client = await db.clients.findByPk(clientId);
    const clientProjects = await client.getProjects();

    let projectLogs: any = [];

    for (const project of clientProjects) {
      const projectUsers = await project.getUsers();
      let users = [];

      for (const user of projectUsers) {
        const projectUserDetails = await db.project_users.findOne({
          where: {
            projectId: project.id,
            userId: user.id
          }
        })

        const workLogs = await user.getWork_logs({
          where: { 
            projectId: project.id,
            date: {
              [Op.between]: [startDate, endDate],
            } 
          }
        })

        const userTotalHours = workLogs.reduce((a: any, b: any) => a + b.dataValues.qty, 0);

        const userObj = {
          name: user.firstName + ' ' + user.lastName,
          id: user.id,
          userEmail: user.email,
          totalHours: userTotalHours,
          pricePerHour: projectUserDetails.pricePerHour,
          totalAmount: userTotalHours * projectUserDetails.pricePerHour,
          logs: workLogs,
          checked: false
        }

        if (userObj.logs.length > 0) {
          users.push(userObj);
        }
      }

      const projectTotalHours = users.reduce((a: any, b: any) => a + b.totalHours, 0);
      const projectTotalAmount = users.reduce((a: any, b: any) => a + b.totalAmount, 0)

      const projectObj = {
        name: project.name,
        id: project.id,
        totalHours: projectTotalHours,
        totalAmount: projectTotalAmount,
        users: users,
        checked: false
      }
      
      if (projectObj.users.length > 0) {
        projectLogs.push(projectObj);
      }
    }
  
    res.json({ data: { client: client.name, clientId: client.id, projects: projectLogs } })
  } catch(err) {
    console.log(err)
    res.json(err.name);
  }
}