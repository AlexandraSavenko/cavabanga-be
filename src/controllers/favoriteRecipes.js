// import createHttpError from 'http-errors';

import {
  getAllFavoriteRecipes,
  deleteFavoriteRecipe,
  postFavoriteRecipe,
} from '../services/favoriteRecipes.js';

export const getFavoriteRecipesController = async (req, res) => {
  // const userId = req.user._id;
  console.log('ID:', req.user._id);

  const favoriteRecipes = await getAllFavoriteRecipes(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully found favorite recipes!',
    data: favoriteRecipes,
  });
};

export const deleteFavoriteRecipeController = async (req, res, next) => {
  await deleteFavoriteRecipe(req.params.recipeId, req.user._id);

  res.status(204).send();
};

export const postFavoriteRecipeController = async (req, res, next) => {
  const result = await postFavoriteRecipe(req.params.recipeId, req.user._id);

  res.status(201).json({
    status: 201,
    message: `Recipe added to favorites`,
    favoriteRecipes: result,
  });
};
