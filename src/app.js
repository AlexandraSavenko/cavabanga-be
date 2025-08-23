import express from "express";
import cors from "cors";
import recipesRouter from "./routes/recipesRouter.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/api/recipes", recipesRouter);

// Error handler (last)
app.use(errorHandler);

export default app;
