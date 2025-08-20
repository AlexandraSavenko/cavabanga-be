import Recipe from '../models/Recipe.js';

export const getRecipeById = async (id) => {
  return await Recipe.findById(id);
};
