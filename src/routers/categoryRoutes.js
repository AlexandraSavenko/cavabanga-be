// routers/categoryRoutes.js
import { Router } from 'express';

const router = Router();

const getAllCategories = (req, res) => {
  res.json({ message: 'Всі категорії (тимчасова заглушка)' });
};

const getCategoryByIdController = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Категорія з id ${id} (тимчасова заглушка)` });
};

router.get('/', getAllCategories);
router.get('/:id', getCategoryByIdController);

export default router;
