import { Router } from "express";
import { getAllRecipes, getOneRecipe } from "../controllers/recipeController.js";

const router = Router();

/**
 * Public search with filters + pagination
 * GET /api/recipes?category=&ingredient=&search=&page=&limit=
 */
router.get("/", getAllRecipes);

/**
 * Public details
 * GET /api/recipes/:id
 */
router.get("/:id", getOneRecipe);

export default router;
