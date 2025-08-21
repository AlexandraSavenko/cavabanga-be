// routers/productRoutes.js
// Маршрути для роботи з товарами

import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
} from '../controllers/productController.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;
