import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { setting } from '../config/config';
import { validateRegister, validateLogin } from '../models/db';
import EliteMart from '../models/db';

export const register = async (req: Request, res: Response): Promise<void> => {
  const input = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const result = validateRegister(input);
  if (result.error) res.status(400).send(result.error.details[0].message);

  if (await EliteMart.findOne({ email: input.email })) {
    res.status(400);
    throw new Error('You Already Exist. Login Instead');
  }
  const hashedPassword = await bcrypt.hash(input.password, 10);
  try {
    const user = await EliteMart.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      cart: [],
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid Data');
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const result = validateLogin({ email, password });
  if (result.error) res.status(400).send(result.error.details[0].message);

  const user = await EliteMart.findOne({ email: email });

  if (user) {
    const hashedPassword: string = user.password;

    // Compare client password with db password
    if (await bcrypt.compare(password, hashedPassword)) {
      const accessToken = jwt.sign(
        //Payload
        {
          userDetails: {
            id: user._id,
            email: user.email,
            cart: user.cart,
          },
        },
        //Access Token Secret Key
        setting.secretKey,
        // Options like token expiry
        { expiresIn: '4h' }
      );
      res.send({ Status: 'Logged in Successfully', Access_Token: accessToken });
    }
  } else {
    res.status(401);
    throw new Error('Email or Password are invalid');
  }
};
