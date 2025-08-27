import Joi from 'joi';

export const recipeSchemaJoi = Joi.object({
  name: Joi.string().max(64).required(),
  category: Joi.string().required(),
  instruction: Joi.string().max(1200).required(),
  decr: Joi.string().max(200).required(),
  cookiesTime: Joi.number().min(1).max(360).required(),
  ingredient: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().hex().length(24).required(),
        ingredientAmount: Joi.string().required(),
      }),
    )
    .min(2)
    .max(16)
    .required(),
  cals: Joi.number().min(1).max(10000),
});
