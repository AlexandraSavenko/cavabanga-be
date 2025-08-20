import { Router } from "express";
// import { registerUserSchema, loginUserSchema } from "../validation/auth.js";
import { registerUserController, loginUserController } from "../controllers/auth.js";

const router = Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);

export default router;