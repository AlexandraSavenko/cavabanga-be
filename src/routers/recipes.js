import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createRecipe } from "../controllers/recipeController.js";
import { recipeSchemaJoi } from "../validation/recipeSchemas.js";
import  upload  from '../middlewares/upload.js';
import { parseIngredients } from "../middlewares/parseIngredients.js";

const router = express.Router();

router.post("/", authenticate, upload.single('recipeImg'),parseIngredients, validateBody(recipeSchemaJoi), createRecipe);



export default router;

