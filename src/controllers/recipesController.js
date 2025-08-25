import { getOwnRecipes } from '../services/recipesService.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getRecipesController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    const recipes = await getOwnRecipes(
        {
            page,
            perPage,
            sortBy,
            sortOrder,
        },
        req.user._id,
    );
    
    res.json({
        status: 200,
        message: 'Successfully found recipes!',
        data: recipes,
    });
};
