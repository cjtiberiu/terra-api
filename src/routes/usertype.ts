import { Router } from 'express';
import { authToken } from '../middleware/tokenCheck';
import { getUserTypes } from '../controllers/usertype';

export const userTypes: Router = Router();

userTypes.get('/getusertypes', authToken, getUserTypes);
