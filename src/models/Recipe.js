import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Number, required: true },
  calories: { type: Number },
  category: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  instructions: { type: String, required: true },
  photo: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Recipe', recipeSchema);