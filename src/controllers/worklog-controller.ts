import { Request, Response } from 'express';
const db = require('../models/');

export const addWorkLog = async (req: Request, res: Response) => {
  const { qty, date, projectId, userId } = req.body;

  try {
    const newLog = await db.workLogs.create({
      qty,
      date,
      projectId,
      userId
    });

    return res.json({ data: newLog, message: `Log added succesfully` });
  } catch (err) {
    res.json(err.name);
  }
};

export const updateWorkLog = async (req: Request, res: Response) => {
  const { id, qty, date, projectId, userId } = req.body;

  try {
    const updateLog = await db.workLogs.update(
      { qty, date, projectId, userId },
      {
        where: {
          id: id,
        },
      }
    );

    return res.json({ data: updateLog, message: 'Log updated succesfully' });
  } catch (err) {
    res.json(err.name);
  }
}

export const removeWorkLog = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const log = await db.workLogs.destroy({
      where: {
        id: id,
      },
    });

    res.json({ message: 'Log deleted succesfully' });
  } catch (err) {
    res.json(err.name);
  }
}