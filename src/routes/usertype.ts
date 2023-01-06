import { Router } from 'express';
import { authToken } from '../middleware/tokenCheck';
import { getUserTypes } from '../controllers/usertype';
import { adminCheck } from '../middleware/adminCheck';

export const userTypes: Router = Router();

userTypes.get('/getusertypes', authToken, adminCheck, getUserTypes);
