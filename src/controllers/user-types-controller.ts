import { Request, Response } from 'express';
const db = require('../models/');

export const getUserTypes = async (req: Request, res: Response) => {
  try {
    const userTypes = await db.userTypes.findAll();

    res.json({ data: userTypes });
  } catch (err) {
    res.json(err.name);
  }
};
