import { Router } from 'express';
import { authToken } from '../middleware/tokenCheck';
import {
  getUsers,
  removeUser,
  getUser, updateUser,
  getUserTypes, getUserRoles,
  getUserDetails,
  getUserWorkLogs
} from '../controllers/user-controller';
import { adminCheck } from '../middleware/adminCheck';

export const users: Router = Router();

users.get('/getusers', authToken, getUsers);
users.post('/removeuser', authToken, adminCheck, removeUser);
users.post('/getuser', authToken, adminCheck, getUser);
users.post('/updateUser', authToken, adminCheck, updateUser);
users.get('/getusertypes', authToken, adminCheck, getUserTypes);
users.get('/getuserroles', authToken, getUserRoles);
users.get('/getuserdetails', authToken, getUserDetails);
users.get('/getuserworklogs/:userId/:monthId', authToken, getUserWorkLogs); // TODO: add check for current user and admin only