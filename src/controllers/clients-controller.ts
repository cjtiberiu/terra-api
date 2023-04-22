import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../types';
const db = require('../models/');

export const getClients = async (req: IGetUserAuthInfoRequest, res: Response) => {
  //if (req.user.userType == 'user') return res.sendStatus(401);
  try {
    const clients = await db.clients.findAll({
      include: [
        {
          model: db.countries,
          attributes: ['name', 'code', 'currency'],
        },
      ],
      attributes: {
        exclude: ['countryId'],
      },
    });
    res.json({ clients: clients });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const addClient = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {

  } catch (err) {
    res.json(err);
  }
}
