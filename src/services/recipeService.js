import { isValidObjectId } from "mongoose";
import { Recipe } from "../models/recipeModel.js";
import { Ingredient } from "../models/ingredientModel.js";

/**
 * Fetch recipes with filters + pagination.
 * Supports:
 *  - category=string
 *  - ingredient=<ObjectId or name>    (if name, resolves to matching Ingredient ids)
 *  - search=<title substring, case-insensitive>
 *  - page, limit
 */
export async function getRecipes({ category, ingredient, search, page = 1, limit = 10 }) {
  const filter = {};

  if (category) filter.category = category;

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (ingredient) {
    let ingredientIds = [];

    if (isValidObjectId(ingredient)) {
      ingredientIds.push(ingredient);
    } else {
      const found = await Ingredient.find(
        { name: { $regex: ingredient, $options: "i" } },
        { _id: 1 }
      ).lean();
      ingredientIds = found.map((d) => d._id.toString());
    }

    if (ingredientIds.length === 0) {
      return { results: [], total: 0, page: Number(page), totalPages: 0 };
    }

    filter["ingredients.ingredient"] = { $in: ingredientIds };
  }

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 10));
  const skip = (pageNum - 1) * limitNum;

  const [results, total] = await Promise.all([
    Recipe.find(filter)
      .populate("ingredients.ingredient", "name unit calories")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Recipe.countDocuments(filter),
  ]);

  return {
    results,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum) || 0,
  };
}

export async function getRecipeById(id) {
  return Recipe.findById(id)
    .populate("ingredients.ingredient", "name unit calories")
    .lean();
}
