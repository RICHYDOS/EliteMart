import express from 'express';
import tryCatch from '../middleware/tryCatch';
import { display, update } from '../controllers/carts';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/user', auth, tryCatch(display));
router.put('/user', auth, tryCatch(update));

export default router;
