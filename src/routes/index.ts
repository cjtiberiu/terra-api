import { Router } from 'express';
import { homeRoute } from './home';
import { auth } from './auth';
import { clients } from './clients';
import { users } from './users';
import { worklogs } from './worklogs';
import { projects } from './projects';
import { countries } from './countries';
import { invoices } from './invoices';

export const routes: Router = Router();

routes.use(homeRoute);
routes.use(auth);
routes.use(clients);
routes.use(users);
routes.use(worklogs);
routes.use(projects);
routes.use(countries);
routes.use(invoices);