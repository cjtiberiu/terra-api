import { Request, Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest, IUserObject } from '../types';
const jwt = require('jsonwebtoken');

export function authToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (token == null) return res.status(401).json({ message: 'Forbidden' });

    jwt.verify(token, process.env.JWT_TOKEN as string, (err: any, user: IUserObject) => {
        if (err) return res.status(403).json(err);

        req.user = user;

        next();
    });
}
