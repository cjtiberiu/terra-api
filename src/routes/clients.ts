import { Router } from 'express';
import { getClients } from '../controllers/clients';
import { authToken } from '../middleware/tokenCheck';

export const clients: Router = Router();

clients.get('/getclients', authToken, getClients);
