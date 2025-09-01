export const parseIngredients = (req, res, next) => {
  if (req.body.ingredient && typeof req.body.ingredient === 'string') {
    try {
      req.body.ingredient = JSON.parse(req.body.ingredient);
    } catch {
      const error = new Error('Ingredients must be an array');
      error.status = 400;
      return next(error);
    }
  }
  next();
};
