import { Router } from 'express';
import { login } from '../controllers/auth';

export const auth: Router = Router();

auth.post('/login', login);
