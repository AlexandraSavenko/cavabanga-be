import { Router } from "express";
// import { registerUserSchema } from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";

const router = Router();

router.post('/register', registerUserController);

export default router;