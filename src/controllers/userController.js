// controllers/userController.js
// Обробники запитів користувача

import { fetchCurrentUser } from '../services/userService.js';

export const getCurrentUser = async (req, res) => {
  const user = await fetchCurrentUser(1);
  res.json(user);
};
