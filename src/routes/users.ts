import { Router } from 'express';
import { authToken } from '../middleware/tokenCheck';
import { getUsers, removeUser, getUser, updateUser, getUserTypes, getUserRoles } from '../controllers/users';
import { adminCheck } from '../middleware/adminCheck';

export const users: Router = Router();

users.get('/getusers', authToken, getUsers);
users.post('/removeuser', authToken, adminCheck, removeUser);
users.post('/getuser', authToken, adminCheck, getUser);
users.post('/updateUser', authToken, adminCheck, updateUser);
users.get('/getusertypes', authToken, adminCheck, getUserTypes);
users.get('/getuserroles', authToken, adminCheck, getUserRoles);
