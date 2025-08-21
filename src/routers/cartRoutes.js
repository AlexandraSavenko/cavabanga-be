// routers/cartRoutes.js
// Маршрути для роботи з кошиком

import { Router } from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
} from '../controllers/cartController.js';

const router = Router();

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove/:id', removeFromCart);

export default router;
