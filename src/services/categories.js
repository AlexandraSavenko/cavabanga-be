import { CategoriesCollection } from '../db/models/categories.js';
import createHttpError from 'http-errors';

export const getCategories = async (req, res) => {
  const categories = await CategoriesCollection.find().sort({ name: 1 });

  if (categories.length == 0) {
    throw createHttpError(404, 'Not found');
  }

  return categories;
};
