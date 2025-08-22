import { RecipesCollection } from '../db/models/Recipe.js';

export const getRecipeById = async (id) => {
  return await RecipesCollection.findById(id);
};
