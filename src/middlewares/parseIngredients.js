export const parseIngredients = (req, res, next) => {
  if (req.body.ingredients && typeof req.body.ingredients === "string") {
    try {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    } catch  {
      const error = new Error("Ingredients must be an array");
      error.status = 400;
      return next(error);
    }
  }
  next();
};
