import { Router } from "express";
import { registerUserSchema, loginUserSchema } from "../validation/auth.js";
import { registerUserController, loginUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = Router();

router.post('/register', validateBody(registerUserSchema), registerUserController);
router.post('/login', validateBody(loginUserSchema), loginUserController);

export default router;