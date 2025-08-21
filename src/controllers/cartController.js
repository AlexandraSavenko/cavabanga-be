// controllers/cartController.js
// Обробники запитів кошика

export const getCart = async (req, res) => {
  res.json({ items: [] });
};

export const addToCart = async (req, res) => {
  res.json({ message: 'Товар додано до кошика' });
};

export const removeFromCart = async (req, res) => {
  res.json({ message: 'Товар видалено з кошика' });
};
