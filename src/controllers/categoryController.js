// controllers/categoryController.js
// Обробники запитів категорій

import {
  fetchAllCategories,
  fetchCategoryById,
} from '../services/categoryService.js';

export const getAllCategories = async (req, res) => {
  const categories = await fetchAllCategories();
  res.json(categories);
};

export const getCategoryByIdController = async (req, res) => {
  const category = await fetchCategoryById(Number(req.params.id));
  if (!category) {
    return res.status(404).json({ message: 'Категорію не знайдено' });
  }
  res.json(category);
};
