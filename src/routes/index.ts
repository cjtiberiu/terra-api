import { Router } from 'express';
import { homeRoute } from './home';

export const routes: Router = Router();

routes.use(homeRoute);