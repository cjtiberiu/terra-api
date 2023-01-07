import { Router } from 'express';
import { login, register } from '../controllers/auth';
import { authToken } from '../middleware/tokenCheck';
import { adminCheck } from '../middleware/adminCheck';

export const auth: Router = Router();

auth.post('/login', login);
auth.post('/register', authToken, adminCheck, register);
