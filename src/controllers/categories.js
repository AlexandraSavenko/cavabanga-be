import { getCategories } from '../services/categories.js';

export const getCategoriesController = async (req, res, next) => {
  const categories = await getCategories();

  res.json({
    status: 200,
    message: 'Successful request for all categories',
    data: categories,
  });
};
