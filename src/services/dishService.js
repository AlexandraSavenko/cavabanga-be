import { RecipesCollection } from '../db/models/recipe.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

/**
 * Отримання страв з фільтрацією та пагінацією
 * @param {Object} params - { name, category, ingredient, page, perPage }
 * @returns {Object} - { dishes, total, perPage, page, totalPages }
 */
export const getDishes = async ({ name, category, ingredient, page = 1, perPage = 12 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // Формуємо фільтри
  const filters = {};
  if (name) {
    filters.name = { $regex: name, $options: 'i' }; // пошук по входженню в назву
  }
  if (category) {
    filters.category = category;
  }
  if (ingredient) {
    filters.ingredient = ingredient;
  }

  const dishesQuery = RecipesCollection.find(filters);

  // Отримуємо список і кількість паралельно
  const [dishesCount, dishes] = await Promise.all([
    RecipesCollection.countDocuments(filters),
    dishesQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(dishesCount, perPage, page);

  return {
    dishes,
    ...paginationData,
  };
};

