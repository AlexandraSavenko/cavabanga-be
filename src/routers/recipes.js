import { Router } from 'express';
import { getRecipeByIdController } from '../controllers/recipes.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/:id', ctrlWrapper(getRecipeByIdController));

export default router;
