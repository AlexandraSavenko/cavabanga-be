import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';

const SECRET_KEY = getEnvVar('SECRET_KEY');

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    const { userId } = decoded;
     req.user = { userId };

    next();
  });
};