import { Request } from 'express';

declare namespace Express {
  interface Request {
    user: Object; //or can be anythin
  }
}

export interface IUserObject {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contractStartDate: any;
  contractEndDate: any;
  createdAt: any;
  updatedAt: any;
  userType: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: IUserObject;
}
