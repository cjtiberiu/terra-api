import { Router } from 'express';
import { login, getUsers, register } from '../controllers/auth';
import { authToken } from '../middleware/tokenCheck';

export const auth: Router = Router();

auth.post('/login', login);
auth.post('/register', register);
auth.get('/getusers', authToken, getUsers);