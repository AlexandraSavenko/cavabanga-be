import { createRecipeService } from "../services/recipeServices.js";

export const createRecipe = async (req, res) => {
  const {
    name,
    description,
    cookingTime,
    calories,
    category,
    ingredients,
    ingredientAmount,
    instruction,
  } = req.body;

  const recipeImg = req.file?.path || null;

  const newRecipe = await createRecipeService({
    name,
    description,
    cookingTime,
    calories,
    category,
    ingredients,
    ingredientAmount,
    instruction,
    recipeImg,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: "Recipe created successfully",
    recipe: newRecipe,
  });
};

