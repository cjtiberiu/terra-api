import { Request, Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../types';
const jwt = require('jsonwebtoken');

export function adminCheck(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
  if (req.user.userType !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  next();
}
