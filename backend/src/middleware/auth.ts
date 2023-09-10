import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { setting } from '../config/config';
import { Schema } from 'mongoose';
import EliteMart from '../models/db';

export interface UserPayload {
  userDetails: {
    email: string;
    id: Schema.Types.ObjectId;
    cart: [
      {
        name: string;
        price: string;
        count: number;
      }
    ];
  };
  iat: number;
  exp: number;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).send({
      Title: 'Error',
      Message: 'User is not Authorized or Token is missing',
    });
    throw new Error('Token is missing ');
  }

  try {
    const decodedToken = jwt.verify(
      token.replace('Bearer ', ''),
      setting.secretKey
    ) as UserPayload;
    const user = await EliteMart.findOne({
      email: decodedToken.userDetails.email,
    }).select('-password');
    if (!user) {
      res.status(401).send({
        Title: 'Error',
        Message: 'User is not Authorized',
      });
      throw new Error('User is not Authorized');
    }

    res.locals.user = user;
    next();
  } catch (err) {
    next();
  }
};
