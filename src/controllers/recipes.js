import createError from 'http-errors';
import { getRecipeById } from '../services/recipes.js';

export const getRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(id);
    if (!recipe) {
      throw createError(404, 'Recipe not found');
    }
    res.json({
      status: 200,
      message: 'Recipe retrieved successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
