import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    image: { type: String },
    category: { type: String, index: true },
    cookTime: { type: String },   // or Number if you prefer strictly minutes
    calories: { type: Number },

    ingredients: [
      {
        ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient", required: true },
        quantity: { type: String }, // "200 g", "2 pcs"
      },
    ],

    instructions: [{ type: String }],
  },
  { versionKey: false, timestamps: true }
);

export const Recipe = model("Recipe", recipeSchema);
