import express from "express";
import { Recipe } from "../models/Recipe.js";

const router = express.Router();

/**
 * @route   GET /api/recipes
 * @desc    Пошук рецептів за категорією, інгредієнтом, назвою (з пагінацією)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const { category, ingredient, search, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (ingredient) {
      filter.$or = [
        { ingredients: { $regex: ingredient, $options: "i" } },        // масив рядків
        { "ingredients.name": { $regex: ingredient, $options: "i" } }, // масив об’єктів
      ];
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [recipes, total] = await Promise.all([
      Recipe.find(filter).skip(skip).limit(Number(limit)),
      Recipe.countDocuments(filter),
    ]);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      results: recipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
