import * as recipeService from "../services/recipeService.js";

export async function getAllRecipes(req, res, next) {
  try {
    const { category, ingredient, ingredientName, search, page, limit } = req.query;

    const result = await recipeService.getRecipes({
      category,
      ingredient,
      ingredientName,
      search,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getOneRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    next(err);
  }
}
