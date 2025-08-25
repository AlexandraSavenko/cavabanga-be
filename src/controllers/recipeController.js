import { createRecipeService } from '../services/recipeServices.js';

export const createRecipe = async (req, res) => {
  const recipeImg = req.file?.path || null;

  const newRecipe = await createRecipeService({
    ...req.body,
    recipeImg,
    owner: req.user._id,
    category: req.body.category,
    ingredient: req.body.ingredient,
  });

  res.status(201).json({
    status: 201,
    message: 'Recipe created successfully',
    recipe: newRecipe,
  });
};
