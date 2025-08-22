import { Router } from 'express';
import { getRecipeByIdController } from '../controllers/recipes.js';

const router = Router();

router.get('/:id', getRecipeByIdController);

export default router;
