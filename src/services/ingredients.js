import { IngredientsCollection } from '../db/models/ingredient.js';
import createHttpError from 'http-errors';

export const getIngredients = async (req, res) => {
  const ingredients = await IngredientsCollection.find().sort({ name: 1 });

  if (ingredients.length == 0) {
    throw createHttpError(404, 'Not found');
  }

  return ingredients;
};
