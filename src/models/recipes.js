import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  category: { type: String },
  cookingTime: { type: Number }, 
  calories: { type: Number },
  ingredients: [
    {
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
      quantity: { type: Number },
    },
  ],
  instructions: [String],
});

export default mongoose.model("Recipe", recipeSchema);
