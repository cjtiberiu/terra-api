import { Router } from 'express';
import { homeRoute } from './home';
import { auth } from './auth';

export const routes: Router = Router();

routes.use(homeRoute);
routes.use(auth);