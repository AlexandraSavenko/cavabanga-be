import express from 'express';
import { getRecipeByIdController } from '../controllers/recipes';

const router = express.Router();

router.get('/:id', getRecipeByIdController);

export default router;
