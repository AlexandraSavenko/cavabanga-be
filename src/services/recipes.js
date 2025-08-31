import createHttpError from 'http-errors';
import { SORT_ORDER } from '../constants/index.js';

import { RecipesCollection } from '../db/models/recipe.js';
import { UsersCollection } from '../db/models/user.js';
import { IngredientsCollection } from '../db/models/ingredient.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// створити публічний ендпоінт для отримання детальної інформації про рецепт за його id
export const getRecipeById = async (id) => {
  const recipe = await RecipesCollection.findById(id).populate({
    path: 'ingredient.id',
    select: 'name',
  });
  if (!recipe) {
    throw createHttpError(404, 'Recipe not found, try again later');
  }
  const formattedRecipe = recipe.toObject();
  formattedRecipe.ingredient = formattedRecipe.ingredient.map((item) => {
    return {
      name: item.id.name,
      ingredientAmount: item.ingredientAmount,
    };
  });

  return formattedRecipe;
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

  const recipesQuery = RecipesCollection.find({ owner: userId }).populate({
    path: 'ingredient.id',
    select: 'name',
  });

  const recipeCount = await RecipesCollection.find()
    .merge(recipesQuery)
    .countDocuments();

  const recipes = await recipesQuery.skip(skip).limit(limit).exec();
  if (recipes.length == 0) {
    throw createHttpError(404, 'Recipe not found, try again later');
  }
  const formattedRecipes = recipes.map((recipe) => {
    const recipeObject = recipe.toObject();
    if (recipeObject.ingredient) {
      recipeObject.ingredient = recipeObject.ingredient.map((item) => {
        return {
          name: item.id.name,
          ingredientAmount: item.ingredientAmount,
        };
      });
    }
    return recipeObject;
  });

  const paginationData = calculatePaginationData(recipeCount, perPage, page);

  return {
    data: formattedRecipes,
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
    throw createHttpError(404, 'Not found');
  }
  const savedRecipeIds = user.savedRecipes;

  const favoriteRecipes = await RecipesCollection.find({
    _id: { $in: savedRecipeIds },
  }).populate({
    path: 'ingredient.id',
    select: 'name',
  });

  const formattedFavoriteRecipes = favoriteRecipes.map((recipe) => {
    const recipeObject = recipe.toObject();
    if (recipeObject.ingredient) {
      recipeObject.ingredient = recipeObject.ingredient.map((item) => {
        return {
          name: item.id.name,
          ingredientAmount: item.ingredientAmount,
        };
      });
    }
    return recipeObject;
  });

  return {
    data: formattedFavoriteRecipes,
  };
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

  const filters = {};

  if (name) {
    filters.name = { $regex: name, $options: 'i' };
  }

  if (category) {
    filters.category = category;
  }

  if (ingredient) {
    filters['ingredient.id'] = { $regex: ingredient, $options: 'i' };
  }

  const recipesQuery = RecipesCollection.find(filters);

  const [recipesCount, recipes] = await Promise.all([
    RecipesCollection.countDocuments(filters),
    recipesQuery.skip(skip).limit(limit).exec(),
  ]);

  if (recipes.length === 0) {
    throw createHttpError(404, 'Recipe not found, try again later');
  }

  const allIngredientIds = recipes.flatMap((r) =>
    r.ingredient.map((i) => i.id),
  );

  const uniqueIngredientIds = [...new Set(allIngredientIds)];

  const ingredientsDocs = await IngredientsCollection.find({
    _id: { $in: uniqueIngredientIds },
  }).select('name');

  const ingredientMap = {};
  ingredientsDocs.forEach((doc) => {
    ingredientMap[doc._id.toString()] = doc.name;
  });

  const formattedRecipes = recipes.map((recipe) => {
    const recipeObject = recipe.toObject();
    if (recipeObject.ingredient) {
      recipeObject.ingredient = recipeObject.ingredient.map((item) => ({
        name: ingredientMap[item.id] || item.id,
        ingredientAmount: item.ingredientAmount,
      }));
    }
    return recipeObject;
  });

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: formattedRecipes,
    ...paginationData,
  };
};
