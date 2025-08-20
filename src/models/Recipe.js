import { Schema, model } from "mongoose";

const ingredientSchema = new Schema({
  name: String,
  amount: String,
});

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    image: String,
    category: String,
    time: Number, // хвилини
    calories: Number,
    ingredients: [ingredientSchema],
    instructions: [String],
  },
  { timestamps: true }
);

export const Recipe = model("Recipe", recipeSchema);
