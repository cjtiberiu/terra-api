import { Request, Response } from 'express';
const db = require('../models/');
const bcrypt = require('bcrypt');

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await db.users.findOne({ where: { email: email } });
        if (!user) {
            res.send('Email not found');
        }
        bcrypt.compare(
            password,
            user.password,
            function (err: any, result: any) {
                if (result) {
                    res.send('User logged in');
                } else {
                    res.send('Wrong password');
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
};
