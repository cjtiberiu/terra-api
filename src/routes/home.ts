import { Router, Request, Response } from 'express';

export const homeRoute: Router = Router();

homeRoute.get('/', (req: Request, res: Response) => {
    res.send('Express + Typescript + MySql App');
});