import { Recipe } from '../db/models/recipe.js';

export const getRecipeById = async (id) => {
  return await Recipe.findById(id);
};
