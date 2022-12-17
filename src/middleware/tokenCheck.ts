import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

export function authToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    //const token = authHeader && authHeader.split(' ')[1];
    const token = req.headers['authorization'];

    if (token == null) return res.sendStatus(401);

    jwt.verify(
        token,
        process.env.JWT_TOKEN as string,
        (err: any, user: any) => {
            console.log(err);

            if (err) return res.sendStatus(403);

            req.user = user;

            next();
        }
    );
}
