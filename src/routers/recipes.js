import express from 'express';
import { getRecipeByIdController } from '../controllers/recipes';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/:id', ctrlWrapper(getRecipeByIdController));

export default router;
