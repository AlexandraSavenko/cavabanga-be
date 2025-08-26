import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
} from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
// створити публічний ендпоінт реєстрації користувача
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

// створити публічний ендпоінт логінізації користувача
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

// створити приватний ендпоінт для логаута користувача
router.post('/logout', authenticate, ctrlWrapper(logoutUserController));
export default router;
