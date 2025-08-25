import { RecipesCollection } from '../db/models/recipe.js';

export const getRecipeById = async (id) => {
  return await RecipesCollection.findById(id);
};
