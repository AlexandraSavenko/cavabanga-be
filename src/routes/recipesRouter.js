import { Router } from "express";
import { getAllRecipes, getOneRecipe } from "../controllers/recipeController.js";

const router = Router();

/**
 * GET /api/recipes
 * Query:
 *  - category=string
 *  - ingredient=<ingredientId>
 *  - ingredientName=<partial name>
 *  - search=<title contains>
 *  - page, limit
 */
router.get("/", getAllRecipes);

/**
 * GET /api/recipes/:id
 * Fetch single recipe by id.
 */
router.get("/:id", getOneRecipe);

export default router;
