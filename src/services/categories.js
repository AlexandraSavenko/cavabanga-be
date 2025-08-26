import { CategoriesCollection } from '../db/models/categories.js';

export const getCategories = async (req, res) => {
  return CategoriesCollection.find().sort({ name: 1 });
};
