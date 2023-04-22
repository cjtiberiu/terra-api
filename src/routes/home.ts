import { Router, Request, Response } from 'express';

export const homeRoute: Router = Router();

homeRoute.get('/', (req: Request, res: Response) => {
  res.json('Express + Typescript + MySql App');
});