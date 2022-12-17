import { Router } from 'express';
import { login, getUsers, register } from '../controllers/auth';
import { authToken } from '../middleware/tokenCheck';

export const auth: Router = Router();

auth.post('/api/login', login);
auth.post('/api/register', register);
auth.get('/api/getusers', authToken, getUsers);