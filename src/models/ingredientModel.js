import { Schema, model } from "mongoose";

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    calories: { type: Number },
    unit: { type: String }, // e.g. "g", "ml", "pcs"
  },
  { versionKey: false, timestamps: true }
);

export const Ingredient = model("Ingredient", ingredientSchema);
