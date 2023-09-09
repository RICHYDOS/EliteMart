import { Request, Response } from 'express';
import EliteMart from '../models/db';

export const display = async (req: Request, res: Response): Promise<void> => {
  const user = res.locals.user;
  res.status(200).send(user.cart);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const currentUser = res.locals.user;
  const user = await EliteMart.findOne({
    email: currentUser.email,
  }).select('cart');
  
  if (!user) {
    res.status(400);
    throw new Error('Server Error');
  }
  user.cart = [];
  for (const obj of req.body) {
    user.cart.push(obj);
  }
  await user.save();
  res.status(200).send({ status: 'Cart Updated' });
};
