import { Router } from 'express';

import {
  getFavoriteRecipesController,
  deleteFavoriteRecipeController,
  postFavoriteRecipeController,
} from '../controllers/favoriteRecipes.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

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

export default router;
