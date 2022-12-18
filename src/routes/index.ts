import { Router } from 'express';
import { homeRoute } from './home';
import { auth } from './auth';
import { clients } from './clients';

export const routes: Router = Router();

routes.use(homeRoute);
routes.use(auth);
routes.use(clients);