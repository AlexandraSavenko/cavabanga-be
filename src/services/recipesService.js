import { RecipesCollection } from '../db/models/recipe.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

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

  console.log(recipesQuery);
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
