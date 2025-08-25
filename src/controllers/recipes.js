import * as recipeService from "../services/recipeService.js";

export const getRecipes = async (req, res) => {
  const { category, ingredient, search, page = 1, limit = 10 } = req.query;

  const data = await recipeService.getRecipes({
    category,
    ingredient,
    search,
    page,
    limit,
  });

  res.json(data);
};

export const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeService.getRecipeById(id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  res.json(recipe);
};
