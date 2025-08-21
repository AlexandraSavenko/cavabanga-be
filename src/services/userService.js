// services/userService.js
// Логіка отримання даних користувача

export const fetchCurrentUser = async (userId) => {
  return { id: userId, name: 'Імʼя користувача' };
};
