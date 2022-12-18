import { Request, Response } from 'express';
import { IUserObject, IGetUserAuthInfoRequest } from '../types';
const db = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await db.users.findOne({
            where: { email: email },
            raw: true,
            attributes: {
                include: [[db.Sequelize.col('user_type.type'), 'userType']],
            },
            include: [{ model: db.userTypes, attributes: [] }],
        });

        if (!user) {
            res.send('Email not found');
        }
        
        const token = generateAccessToken(user);

        bcrypt.compare(password, user.password, function (err: any, result: any) {
            if (result) {
                delete user.password;
                res.status(200).send({ ...user, token });
            } else {
                res.send('Wrong password');
            }
        });
    } catch (err) {
        console.log(err);
    }
};

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const newUser = await db.users.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        });
        res.send(newUser);
    } catch (err) {
        res.send(err);
    }
};

export const getUsers = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const users = await db.users.findAll({
        raw: true,
        attributes: {
            include: [[db.Sequelize.col('user_type.type'), 'userType']],
            exclude: ['password', 'typeId'],
        },
        include: [{ model: db.userTypes, attributes: [] }],
    });
    res.send(users);
};

function generateAccessToken(user: IUserObject) {
    const tokenUser = Object.assign({}, user);
    delete tokenUser.password;
    return jwt.sign(tokenUser, process.env.JWT_TOKEN, {
        expiresIn: '1000000',
    });
}