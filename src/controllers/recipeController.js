import * as recipeService from "../services/recipeService.js";

export async function getAllRecipes(req, res, next) {
  try {
    const { category, ingredient, search, page, limit } = req.query;

    const data = await recipeService.getRecipes({
      category,
      ingredient,   // can be ObjectId or name
      search,
      page,
      limit,
    });

    res.json(data);
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
