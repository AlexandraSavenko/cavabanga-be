import { Recipe } from "../db/models/recipe.js";

export const createRecipe = async (req, res, next) => {
  try {
    let {
      name,
      description,
      cookingTime,
      calories,
      category,
      ingredients,
      ingredientAmount,
      instruction
    } = req.body;

  

if (typeof req.body.ingredients === "string") {
  try {
    req.body.ingredients = JSON.parse(req.body.ingredients);
  } catch  {
    
    const error = new Error("Ingredients must be an array");
    error.status = 400;
    return next(error);
  }
}


    
    const recipeImg = req.file?.path || null;

    
    const newRecipe = await Recipe.create({
      name,
      description,
      cookingTime,
      calories,
      category,
      ingredients,
      ingredientAmount,
      instruction,
      recipeImg,
      userId: req.user._id
    });

    res.status(201).json({
      status: 201,
      message: "Recipe created successfully",
      recipe: newRecipe
    });
  } catch (error) {
    console.error(error); 
    next(error);
  }
};

