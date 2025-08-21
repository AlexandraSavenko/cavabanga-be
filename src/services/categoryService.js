// services/categoryService.js
// Логіка отримання даних категорій (мок-дані)
import { CategoryModel } from '../db/models/category.js';

export const fetchAllCategories = async () => {
  return CategoryModel;
};

export const fetchCategoryById = async (id) => {
  return CategoryModel.find((cat) => cat.id === id) || null;
};
