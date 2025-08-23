import Joi from "joi";

export const recipeSchemaJoi = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500).optional(),
  ingredients: Joi.array().items(Joi.string()).min(1).required(),
  category: Joi.string().required(),
  instruction: Joi.string().min(5).required(),
  cookingTime: Joi.number().min(1).optional(),
  calories: Joi.number().min(0).optional(),
  recipeImg: Joi.string().uri().optional(),
  ingredientAmount: Joi.string().required()
});
