import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController } from '../controllers/users.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getUserController));

export default router;
