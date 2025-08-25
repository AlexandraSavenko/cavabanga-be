import * as dishService from '../services/dishService.js';

export async function getDishes(req, res, next) {
  try {
    const { name, category, ingredient, page, limit } = req.query;

    const result = await dishService.getDishes({
      name,
      category,
      ingredient,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
}
