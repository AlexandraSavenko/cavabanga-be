import { RecipesCollection } from '../db/models/recipe.js';

export const createRecipeService = async (payload) => {
  const newRecipe = await RecipesCollection.create(payload);
  return newRecipe;
};
