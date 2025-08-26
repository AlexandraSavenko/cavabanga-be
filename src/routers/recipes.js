import { Router } from 'express';

import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import upload from '../middlewares/upload.js';
import { parseIngredients } from '../middlewares/parseIngredients.js';

import { recipeSchemaJoi } from '../validation/recipeSchemas.js';

import {
  getRecipesSearch,
  getRecipesController,
  createRecipe,
  getRecipeByIdController,
  getFavoriteRecipesController,
  deleteFavoriteRecipeController,
  postFavoriteRecipeController,
} from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);
// створити приватний ендпоінт для отримання улюблених рецептів
router.get('/favorites', ctrlWrapper(getFavoriteRecipesController));

// створити приватний ендпоінт для видалення рецепту зі списку улюблених
router.delete(
  '/favorites/:recipeId',
  isValidId,
  ctrlWrapper(deleteFavoriteRecipeController),
);

// створити приватний ендпоінт для додавання рецепту до списку улюблених
router.post(
  '/favorites/:recipeId',
  isValidId,
  ctrlWrapper(postFavoriteRecipeController),
);

// створити приватний ендпоінт для створення власного рецепту
router.post(
  '/',
  authenticate,
  upload.single('recipeImg'),
  parseIngredients,
  validateBody(recipeSchemaJoi),
  ctrlWrapper(createRecipe),
);

// створити приватний ендпоінт для отримання власних рецептів
router.get('/own', authenticate, ctrlWrapper(getRecipesController));

// створити публічний ендпоінт для отримання детальної інформації про рецепт за його id
router.get('/:id', ctrlWrapper(getRecipeByIdController));

// створити публічний ендпоінт для пошуку рецептів за категорією, інгредієнтом, входженням пошукового значення в назву рецепту (з урахуванням логіки пагінації)
router.get('/', ctrlWrapper(getRecipesSearch));
export default router;
