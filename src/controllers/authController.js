// controllers/authController.js
// Обробники автентифікації

export const loginUser = async (req, res) => {
  res.json({ message: 'Успішний вхід' });
};

export const registerUser = async (req, res) => {
  res.json({ message: 'Користувача зареєстровано' });
};
