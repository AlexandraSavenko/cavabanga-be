import { Router } from 'express';
import authRouter from './auth.js';
import categoryRoutes from './categoryRoutes.js'; // новий імпорт

const router = Router();

// Приклад існуючого
// router.use('/contacts', contactsRouter);

// Існуючий маршрут авторизації
router.use('/auth', authRouter);

// Новий маршрут для категорій
router.use('/categories', categoryRoutes);

export default router;
