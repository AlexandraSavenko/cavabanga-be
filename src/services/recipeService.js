import { Recipe } from "../models/recipeModel.js";
import { Ingredient } from "../models/ingredientModel.js";

/**
 * Get recipes with filters + pagination.
 * Supports:
 *  - category=string
 *  - ingredient=ObjectId (string) OR ingredientName=string (regex)
 *  - search=string (title contains, case-insensitive)
 *  - page, limit
 */
export async function getRecipes({
  category,
  ingredient,       // Ingredient ObjectId string
  ingredientName,   // Ingredient name search (regex)
  search,           // Title search
  page = 1,
  limit = 10,
}) {
  const filter = {};

  if (category) filter.category = category;

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  // Ingredient filtering by id or name
  if (ingredient || ingredientName) {
    let ingredientIds = [];

    if (ingredient) {
      ingredientIds.push(ingredient);
    }

    if (ingredientName) {
      const byName = await Ingredient.find(
        { name: { $regex: ingredientName, $options: "i" } },
        { _id: 1 }
      ).lean();
      ingredientIds.push(...byName.map((d) => d._id.toString()));
    }

    // If name query yields no matches, return empty result fast
    if (ingredientIds.length === 0) {
      return { recipes: [], total: 0, page: Number(page), totalPages: 0 };
    }

    filter["ingredients.ingredient"] = { $in: ingredientIds };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [recipes, total] = await Promise.all([
    Recipe.find(filter)
      .populate("ingredients.ingredient", "name unit calories")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Recipe.countDocuments(filter),
  ]);

  return {
    recipes,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)) || 0,
  };
}

/**
 * Get single recipe by id.
 */
export async function getRecipeById(id) {
  return Recipe.findById(id)
    .populate("ingredients.ingredient", "name unit calories")
    .lean();
}
