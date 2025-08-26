import { getIngredients } from '../services/ingredients.js';

export const getIngredientsController = async (req, res, next) => {
  const ingredients = await getIngredients();

  res.json({
    status: 200,
    message: 'Successful request for all ingredients',
    data: ingredients,
  });
};
