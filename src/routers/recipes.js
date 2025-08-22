import { Router } from 'express';
import { createOwnRecipe, getOwnRecipes } from '../controllers/recipesController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post('/own', authenticate, createOwnRecipe);

router.get('/own', authenticate, getOwnRecipes);

export default router;







