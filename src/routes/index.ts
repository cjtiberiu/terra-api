import { Router } from 'express';
import { homeRoute } from './home';
import { auth } from './auth';
import { clients } from './clients';
import { userTypes } from './usertype';

export const routes: Router = Router();

routes.use(homeRoute);
routes.use(auth);
routes.use(clients);
routes.use(userTypes);