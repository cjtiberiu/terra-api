import { Request, Response } from 'express';
import { IUserObject, IGetUserAuthInfoRequest } from '../types';
import dotenv from 'dotenv';
const db = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await db.users.findOne({
      where: { email: email },
      raw: true,
      attributes: {
        include: [
          [db.Sequelize.col('user_type.type'), 'userType'],
          [db.Sequelize.col('user_role.role'), 'userRole'],
        ],
      },
      include: [
        { model: db.userTypes, attributes: [] },
        { model: db.userRoles, attributes: [] },
      ],
    });

    if (!user) {
      res.json({ message: 'Email not found' });
    }

    const token = generateAccessToken(user);

    bcrypt.compare(password, user.password, function (err: any, result: any) {
      if (result) {
        delete user.password;
        const userData = { ...user, token };
        res.status(200).json({ data: userData, message: 'User logged in' });
      } else {
        res.json({ message: 'Wrong password' });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, contractStartDate, contractEndDate, userRole, userType } = req.body;
  let formattedStartDate;
  let formattedEndDate;

  // TODO: iso date formatting improvements

  if (contractStartDate) {
    formattedStartDate = new Date(contractStartDate);
    formattedStartDate = formattedStartDate.toISOString().split('T')[0] + ' ' + formattedStartDate.toTimeString().split(' ')[0];
  }

  if (contractEndDate) {
    formattedEndDate = new Date(contractEndDate);
    formattedEndDate = formattedEndDate.toISOString().split('T')[0] + ' ' + formattedEndDate.toTimeString().split(' ')[0];
  }

  try {
    const newUser = await db.users.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(`${process.env.DEFAULT_USER_PASSWORD}`, bcrypt.genSaltSync(10)),
      contractStartDate,
      contractEndDate,
      userRole,
      userType,
    });

    return res.status(200).json({ data: newUser, message: `Utilizatorul ${email} a fost adaugat cu success` });
  } catch (err) {
    return res.status(400).json(err);
  }
};

function generateAccessToken(user: IUserObject) {
  const tokenUser = Object.assign({}, user);
  delete tokenUser.password;
  return jwt.sign(tokenUser, process.env.JWT_TOKEN, {
    expiresIn: '60000000',
  });
}