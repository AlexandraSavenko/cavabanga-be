import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/user.js';
import { RecipesCollection } from '../db/models/recipe.js'; // для роботи populate()

export const getAllFavoriteRecipes = async (userId) => {
  const user = await UsersCollection.findById(userId).populate('savedRecipes'); // можна підтягнути деталі рецептів

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user.savedRecipes;
};

export const deleteFavoriteRecipe = async (recipeId, userId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const index = user.savedRecipes.indexOf(recipeId);
  if (index === -1) {
    throw createHttpError(404, 'Recipe not found in favorites');
  }

  user.savedRecipes.splice(index, 1);
  await user.save();

  return user.savedRecipes;
};

export const postFavoriteRecipe = async (recipeId, userId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (user.savedRecipes.includes(recipeId)) {
    throw createHttpError(409, 'Recipe already in favorites');
  }

  user.savedRecipes.push(recipeId);
  await user.save();

  return user.savedRecipes;
};
