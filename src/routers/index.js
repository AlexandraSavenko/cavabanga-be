import { Router } from 'express';
import authRouter from './auth.js';
import usersRouter from './users.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';
import recipesRouter from './recipes.js';


const router = Router();

// Приклад:
// router.use('/contacts', contactsRouter);
router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/ingredients', ingredientsRouter);
router.use('/api/recipes', recipesRouter);

export default router;
