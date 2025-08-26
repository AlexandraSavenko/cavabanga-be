import { getUserInfo } from '../services/users.js';

// створити приватний ендпоінт на отримання інформації про поточного користувача
export const getUserController = async (req, res, next) => {
  const { id: userId } = req.user;

  const user = await getUserInfo(userId);

  res.json({
    status: 200,
    message: 'Successfully found info about current user',
    data: user,
  });
};
