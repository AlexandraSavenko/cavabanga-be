import { Router } from 'express';
import {
  getFavoriteRecipesController,
  deleteFavoriteRecipeController,
  postFavoriteRecipeController,
} from '../controllers/favoriteRecipes.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRecipe } from '../controllers/recipeController.js';
import { recipeSchemaJoi } from '../validation/recipeSchemas.js';
import upload from '../middlewares/upload.js';
import { parseIngredients } from '../middlewares/parseIngredients.js';
import { getRecipesController } from '../controllers/recipesController.js';
import { getRecipeByIdController } from '../controllers/recipes.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getRecipesSearch } from '../controllers/recipes.js';
const router = Router();

router.use(authenticate);

router.get('/favorites', ctrlWrapper(getFavoriteRecipesController));

router.delete(
  '/favorites/:recipeId',
  isValidId,
  ctrlWrapper(deleteFavoriteRecipeController),
);

router.post(
  '/favorites/:recipeId',
  isValidId,
  ctrlWrapper(postFavoriteRecipeController),
);

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
router.get('/', ctrlWrapper(getRecipesSearch));
export default router;
