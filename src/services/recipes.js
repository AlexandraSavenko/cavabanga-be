import Recipe from "../models/recipes.js";

export const getRecipes = async ({ category, ingredient, search, page, limit }) => {
  const filter = {};
  if (category) filter.category = category;
  if (ingredient) filter.ingredients = { $elemMatch: { name: ingredient } };
  if (search) filter.title = { $regex: search, $options: "i" };

  const skip = (page - 1) * limit;

  const [recipes, total] = await Promise.all([
    Recipe.find(filter).skip(skip).limit(limit),
    Recipe.countDocuments(filter),
  ]);

  return {
    recipes,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    total,
  };
};

export const getRecipeById = async (id) => {
  return Recipe.findById(id).populate("ingredients");
};
