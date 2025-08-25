import Joi from 'joi';

export const recipeSchemaJoi = Joi.object({
  name: Joi.string().min(2).max(64).required(),
  decr: Joi.string().max(200).optional(),
  ingredient: Joi.array()
    .items(Joi.string().hex().length(24))
    .min(1)
    .required(),
  category: Joi.string().required(),
  instruction: Joi.string().max(1200).required(),
  cookiesTime: Joi.number().min(1).max(360).optional(),
  cals: Joi.number().min(1).max(10000).optional(),
  recipeImg: Joi.string().uri().optional(),
  ingredientAmount: Joi.number().min(2).max(16).required(),
});
