import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

const MONGODB_USER = getEnvVar('MONGODB_USER');
const MONGODB_PASSWORD = getEnvVar('MONGODB_PASSWORD');
const MONGODB_URL = getEnvVar('MONGODB_URL');
const MONGODB_DB = getEnvVar('MONGODB_DB');

export async function initMongoConnection() {
  const mongoUri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(mongoUri);

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection failed:', error.message);
    process.exit(1);
  }
}
