import { Router } from "express";
import { getRecipesController } from '../controllers/recipesController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/own', authenticate, ctrlWrapper(getRecipesController));

export default router;



