export const parseIngredients = (req, res, next) => {
  if (req.body.ingredient && typeof req.body.ingredient === 'string') {
    try {
      console.log("3");
      req.body.ingredient = JSON.parse(req.body.ingredient);
      console.log("4");
    } catch {
      const error = new Error('Ingredients must be an array');
      error.status = 400;
      return next(error);
    }
  }
  next();
};
