// Centralized error handler (plugged in app.js)
export function errorHandler(err, req, res, next) {
  console.error("❌", err?.stack || err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: "Server error" });
}
