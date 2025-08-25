import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { createRecipe } from '../controllers/recipeController.js';
import { recipeSchemaJoi } from '../validation/recipeSchemas.js';
import upload from '../middlewares/upload.js';
import { parseIngredients } from '../middlewares/parseIngredients.js';
import { getRecipesController } from '../controllers/recipesController.js';
import { getRecipeByIdController } from '../controllers/recipes.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/',
  authenticate,
  upload.single('recipeImg'),
  parseIngredients,
  validateBody(recipeSchemaJoi),
  ctrlWrapper(createRecipe),
);

router.get('/own', authenticate, ctrlWrapper(getRecipesController));
router.get('/:id', ctrlWrapper(getRecipeByIdController));

export default router;
