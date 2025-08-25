import createError from 'http-errors';
import { getRecipeById } from '../services/recipes.js';
import * as dishService from '../services/dishService.js';
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

export const getRecipesSearch = async (req, res, next) => {
  try {
    const { name, category, ingredient, page, limit } = req.query;

    const result = await dishService.getDishes({
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