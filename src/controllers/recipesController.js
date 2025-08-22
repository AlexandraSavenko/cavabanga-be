import { RecipesCollection } from '../db/models/recipe.js';

export const createOwnRecipe = async (req, res, next) => {
    const { title, description, time, calories } = req.body;
    const owner = req.user._id; 

    try {
        const newRecipe = await RecipesCollection.create({
            title,
            description,
            time,
            calories,
            owner,
        });
        res.status(201).json({
            message: 'Recipe created successfully',
            recipe: newRecipe,
        });
    } catch (error) {
        next(error);
    }
};

export const getOwnRecipes = async (req, res, next) => {
    const ownerId = req.user._id;

    const { page = 1, limit = 9 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const recipes = await RecipesCollection.find({ owner: ownerId })
            .skip(skip)
            .limit(limit);

        const total = await RecipesCollection.countDocuments({ owner: ownerId });
        const hasMore = total > (skip + limit);

        res.status(200).json({ recipes, hasMore });
    } catch (error) {
        next(error);
    }
};