import { Router } from 'express';
import { getClients, addClient, updateClient, removeClient } from '../controllers/clients-controller';
import { authToken } from '../middleware/tokenCheck';
import { adminCheck } from '../middleware/adminCheck';

export const clients: Router = Router();

clients.get('/getclients', authToken, getClients);
clients.post('/addclient', authToken, adminCheck, addClient);
clients.put('/updateclient/:clientId', authToken, adminCheck, updateClient);
clients.delete('/removeclient/:clientId', authToken, adminCheck, removeClient);