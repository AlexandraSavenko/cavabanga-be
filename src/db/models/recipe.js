import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  ingredients: [{ type: String }],
  steps: [{ type: String }],
  info: {
    category: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner'],
      required: true,
    },
    cookingTime: { type: Number, required: true },
    calories: { type: Number, required: true },
  },
  timestamps: true,
});
export const Recipe = model('Recipe', recipeSchema);
