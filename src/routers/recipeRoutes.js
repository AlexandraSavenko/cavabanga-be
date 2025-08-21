import express from 'express';
import multer from 'multer';
import { createRecipe } from '../controllers/recipeController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();
const upload = multer();

router.post('/', authenticateToken, upload.single('photo'), createRecipe);

export default router;