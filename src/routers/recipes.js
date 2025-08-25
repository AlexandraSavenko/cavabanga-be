import express from "express";
import { getRecipes, getRecipeById } from "../controllers/recipesController.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const router = express.Router();

router.get("/", ctrlWrapper(getRecipes));
router.get("/:id", ctrlWrapper(getRecipeById));

export default router;
