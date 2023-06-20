import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../types';
const db = require('../models/');

export const getClients = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const clients = await db.clients.findAll({
      include: [
        {
          model: db.countries,
          attributes: ['id', 'name', 'code', 'currency'],
        },
        {
          model: db.projects
        }
      ],
      attributes: {
        exclude: ['countryId'],
      },
    });

    res.json({ data: clients });
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

    return res.status(200).json({ data: newClient, message: `Clientul ${name} a fost adaugat cu succes!` });
  } catch (err) {
    return res.status(400).json(err);
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

    return res.json({ data: updatedClient, message: `Client ${name} added` });
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

export const getClientDetails = async (req: Request, res: Response) => {
  const { clientId } = req.query;

  try {
    const client = await db.clients.findByPk(clientId, {
      include: [
        {
          model: db.countries,
        },
      ],
      attributes: {
        exclude: ['countryId']
      }
    });

    const clientProjects = await client.getProjects({
      joinTableAttributes: [],
      attributes: {
        exclude: ['clientId', 'projectType']
      },
      include: [
        {
          model: db.projectTypes,
        }
      ]
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    return res.json({ data: { ...client.toJSON(), projects: clientProjects } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}