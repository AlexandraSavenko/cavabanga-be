import { Recipe } from "../db/models/recipe.js";

export const createRecipeService = async (recipeData) => {
  const newRecipe = await Recipe.create(recipeData);
  return newRecipe;
};
