import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    image: { type: String },
    category: { type: String, index: true }, // e.g. "salad", "dessert"
    cookTime: { type: String },               // "30 min" or numeric if you prefer
    calories: { type: Number },

    // Link to Ingredient documents with per-recipe quantity
    ingredients: [
      {
        ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient", required: true },
        quantity: { type: String }, // "200 g", "2 pcs"
      },
    ],

    // Step-by-step instructions
    instructions: [{ type: String }],
  },
  { versionKey: false, timestamps: true }
);

export const Recipe = model("Recipe", recipeSchema);

