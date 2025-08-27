import { model, Schema } from 'mongoose';
const ingredientInRecipeSchema = new Schema(
  {
    id: {
      type: String,
      ref: 'ingredients',
      required: true,
    },
    ingredientAmount: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Seafood',
        'Lamb',
        'Starter',
        'Chicken',
        'Beef',
        'Dessert',
        'Vegan',
        'Pork',
        'Vegetarian',
        'Miscellaneous',
        'Pasta',
        'Breakfast',
        'Side',
        'Goat',
        'Soup',
      ],
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
    decr: {
      type: String,
      required: true,
    },
    recipeImg: {
      type: String,
      default: null,
    },
    cookiesTime: {
      type: Number,
      required: true,
    },
    ingredient: [ingredientInRecipeSchema],
    cals: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RecipesCollection = model('recipes', recipeSchema);
