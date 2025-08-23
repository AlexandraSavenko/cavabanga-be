import { model, Schema } from 'mongoose';

const recipeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String, required: true }],
  category: { type: String, required: true },
  instruction: { type: String, required: true },
  cookingTime: { type: Number },
  calories: { type: Number },
  ingredientAmount: { type: String, required: true},
  recipeImg: { type: String, default: null }
  
});


export const Recipe = model('Recipes', recipeSchema);
