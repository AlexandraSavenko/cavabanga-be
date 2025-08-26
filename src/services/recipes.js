import createHttpError from 'http-errors';
import { SORT_ORDER } from '../constants/index.js';

import { RecipesCollection } from '../db/models/recipe.js';
import { UsersCollection } from '../db/models/user.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// створити публічний ендпоінт для отримання детальної інформації про рецепт за його id
export const getRecipeById = async (id) => {
  return await RecipesCollection.findById(id);
};

// створити приватний ендпоінт для отримання власних рецептів
export const getOwnRecipes = async (
  {
    page = 1,
    perPage = 16,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
  },
  userId,
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const recipesQuery = RecipesCollection.find({ owner: userId });

  if (filter.type) {
    recipesQuery.where('recipeType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    recipesQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [recipeCount, recipes] = await Promise.all([
    RecipesCollection.find().merge(recipesQuery).countDocuments(),
    recipesQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(recipeCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
};

// створити приватний ендпоінт для створення власного рецепту
export const createRecipeService = async (payload) => {
  const newRecipe = await RecipesCollection.create(payload);
  return newRecipe;
};

// створити приватний ендпоінт для отримання улюблених рецептів
export const getAllFavoriteRecipes = async (userId) => {
  const user = await UsersCollection.findById(userId).populate('savedRecipes'); // можна підтягнути деталі рецептів

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user.savedRecipes;
};

// створити приватний ендпоінт для видалення рецепту зі списку улюблених
export const deleteFavoriteRecipe = async (recipeId, userId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const index = user.savedRecipes.indexOf(recipeId);
  if (index === -1) {
    throw createHttpError(404, 'Recipe not found in favorites');
  }

  user.savedRecipes.splice(index, 1);
  await user.save();

  return user.savedRecipes;
};

// створити приватний ендпоінт для додавання рецепту до списку улюблених
export const postFavoriteRecipe = async (recipeId, userId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (user.savedRecipes.includes(recipeId)) {
    throw createHttpError(409, 'Recipe already in favorites');
  }

  user.savedRecipes.push(recipeId);
  await user.save();

  return user.savedRecipes;
};

// створити публічний ендпоінт для пошуку рецептів за категорією, інгредієнтом, входженням пошукового значення в назву рецепту (з урахуванням логіки пагінації)
export const getDishes = async ({
  name,
  category,
  ingredient,
  page = 1,
  perPage = 12,
}) => {
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
    data: dishes,
    ...paginationData,
  };
};
