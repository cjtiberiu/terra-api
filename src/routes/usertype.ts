import { Router } from 'express';
import { authToken } from '../middleware/tokenCheck';
import { getUserTypes } from '../controllers/user-types-controller';
import { adminCheck } from '../middleware/adminCheck';

export const userTypes: Router = Router();

userTypes.get('/getusertypes', authToken, adminCheck, getUserTypes);
