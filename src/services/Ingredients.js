import { IngredientsCollection } from '../db/models/ingredient.js';
export const getIngredients = async (req, res) => {
  return IngredientsCollection.find().sort({ name: 1 });
};
