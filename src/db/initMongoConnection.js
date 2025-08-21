import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

const MONGODB_URL = getEnvVar('MONGODB_URL');

export async function initMongoConnection() {
  try {
    await mongoose.connect(MONGODB_URL);

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection failed:', error.message);
    process.exit(1);
  }
}