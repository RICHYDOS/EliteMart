import express from 'express';
import { Request, Response } from 'express';
import tryCatch from '../middleware/tryCatch';

const router = express.Router();

router.get(
  '/',
  tryCatch(async (req: Request, res: Response): Promise<void> => {
    res.send(
      'Available Endpoints: {Register (Post): /api/user/register, Login (Post): /api/user/login, CartDisplay (Get): /api/cart/user, CartUpdate (PUT): /api/cart/user }'
    );
  })
);

export default router;
