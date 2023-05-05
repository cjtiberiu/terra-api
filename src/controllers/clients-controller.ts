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

export const addClient = async (req: Request, res: Response) => {
  const { name, countryId } = req.body;

  try {
    const newClient = await db.clients.create({
      name,
      countryId
    });

    return res.json({ clientData: newClient, message: `Client ${name} added` });
  } catch (err) {
    return res.json({ message: err.name });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { name, countryId } = req.body;

  console.log('CLIENT ID', clientId)

  try {
    const updatedClient = await db.clients.update(
      {
        name,
        countryId
      },
      {
        where: {
          id: clientId
        }
      }
    );

    return res.json({ clientData: updatedClient, message: `Client ${name} added` });
  } catch (err) {
    return res.json({ message: err.name });
  }
};

export const removeClient = async (req: Request, res: Response) => {
  const { clientId } = req.params;

  try {
    await db.clients.destroy({
      where: {
        id: clientId,
      },
    });

    res.json({ message: 'Client deleted succesfully' });
  } catch (err) {
    return res.json({ message: err.name });
  }
};