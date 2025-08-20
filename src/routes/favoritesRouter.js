import express from "express";
import { addToFavorites, removeFromFavorites } from "../controllers/favoritesController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:id", auth, addToFavorites);
router.delete("/:id", auth, removeFromFavorites);

export default router;
