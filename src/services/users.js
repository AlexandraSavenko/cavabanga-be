import { UsersCollection } from '../db/models/user.js';

export const getUserInfo = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
};
