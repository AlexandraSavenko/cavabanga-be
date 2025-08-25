import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String }, // наприклад: "гр", "мл"
});

export default mongoose.model("Ingredient", ingredientSchema);
