import { UsersCollection } from '../db/models/user.js';

// створити приватний ендпоінт на отримання інформації про поточного користувача
export const getUserInfo = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
};
