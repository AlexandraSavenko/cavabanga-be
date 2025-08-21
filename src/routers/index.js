import { Router } from 'express';
import authRouter from './auth.js';

const router = Router();

// Приклад:
// router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
