import { model, Schema } from 'mongoose';

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  decr: {
    type: String,
    required: true,
  },
  cookiesTime: {
    type: Number,
    required: true,
  },
  cals: {
    type: Number,
    required: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  ingredient: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ingredients',
      required: true,
    },
  ],
  ingredientAmount: {
    type: Number,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  recipeImg: {
    type: String,
    default: null,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

export const RecipesCollection = model('recipes', recipeSchema);
