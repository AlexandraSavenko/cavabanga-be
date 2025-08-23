import express from "express";
import cors from "cors";
import morgan from "morgan";

import recipesRouter from "./routes/recipesRouter.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// --- Routes ---
app.use("/api/recipes", recipesRouter);

// --- Health check ---
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// --- 404 fallback ---
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

// --- Error handler ---
app.use(errorHandler);

export default app;
