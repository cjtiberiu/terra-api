import { Request, Response } from 'express';
const db = require('../models/');

export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await db.countries.findAll();

    res.json({ data: countries });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}