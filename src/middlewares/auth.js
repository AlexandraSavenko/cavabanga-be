import jwt from "jsonwebtoken";

/**
 * Usage:
 *  app.use("/api/private", authMiddleware)
 */
export function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload?.id };
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}
