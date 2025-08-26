import createError from 'http-errors';

import {
  getRecipeById,
  getOwnRecipes,
  createRecipeService,
  getAllFavoriteRecipes,
  deleteFavoriteRecipe,
  postFavoriteRecipe,
  getDishes,
} from '../services/recipes.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

// створити публічний ендпоінт для отримання детальної інформації про рецепт за його id
export const getRecipeByIdController = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) {
    throw createError(404, 'Recipe not found, try again later');
  }
  res.json({
    status: 200,
    message: 'Recipe retrieved successfully',
    data: recipe,
  });
};

// створити публічний ендпоінт для пошуку рецептів за категорією, інгредієнтом, входженням пошукового значення в назву рецепту (з урахуванням логіки пагінації)
export const getRecipesSearch = async (req, res, next) => {
  try {
    const { name, category, ingredient, page, limit } = req.query;

    const result = await getDishes({
      name,
      category,
      ingredient,
      page: Number(page) || 1,
      perPage: Number(limit) || 10, // 🔹 узгодив із dishService
    });

    res.json({
      status: 200,
      message: 'Recipes retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// створити приватний ендпоінт для отримання власних рецептів
export const getRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const recipes = await getOwnRecipes(
    {
      page,
      perPage,
      sortBy,
      sortOrder,
    },
    req.user._id,
  );

  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
};

// створити приватний ендпоінт для створення власного рецепту
export const createRecipe = async (req, res) => {
  const recipeImg = req.file?.path || null;

  const newRecipe = await createRecipeService({
    ...req.body,
    recipeImg,
    owner: req.user._id,
    category: req.body.category,
    ingredient: req.body.ingredient,
  });

  res.status(201).json({
    status: 201,
    message: 'Recipe created successfully',
    recipe: newRecipe,
  });
};

// створити приватний ендпоінт для отримання улюблених рецептів
export const getFavoriteRecipesController = async (req, res) => {
  // const userId = req.user._id;
  // console.log('ID:', req.user._id);

  const favoriteRecipes = await getAllFavoriteRecipes(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully found favorite recipes!',
    data: favoriteRecipes,
  });
};

// створити приватний ендпоінт для видалення рецепту зі списку улюблених
export const deleteFavoriteRecipeController = async (req, res, next) => {
  await deleteFavoriteRecipe(req.params.recipeId, req.user._id);

  res.status(204).send();
};

// створити приватний ендпоінт для додавання рецепту до списку улюблених
export const postFavoriteRecipeController = async (req, res, next) => {
  const result = await postFavoriteRecipe(req.params.recipeId, req.user._id);

  res.status(201).json({
    status: 201,
    message: `Recipe added to favorites`,
    favoriteRecipes: result,
  });
};
