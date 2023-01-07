import { Router } from 'express';
import { login, getUsers, register, removeUser, getUser, updateUser } from '../controllers/auth';
import { authToken } from '../middleware/tokenCheck';
import { adminCheck } from '../middleware/adminCheck';

export const auth: Router = Router();

auth.post('/login', login);
auth.post('/register', authToken, adminCheck, register);
auth.get('/getusers', authToken, getUsers);
auth.post('/removeuser', authToken, adminCheck, removeUser);
auth.post('/getuser', authToken, adminCheck, getUser);
auth.post('/updateUser', authToken, adminCheck, updateUser);