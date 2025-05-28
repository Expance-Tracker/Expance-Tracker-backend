import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoDB = async () => {
  try {
    const user = encodeURIComponent(getEnvVar('MONGODB_USER'));
    const password = encodeURIComponent(getEnvVar('MONGODB_PASSWORD'));
    const db = encodeURIComponent(getEnvVar('MONGODB_DB'));
    const host = getEnvVar('MONGODB_URL').replace(/^mongodb(\+srv)?:\/\//, '');
    const connectionString = `mongodb+srv://${user}:${password}@${host}/${db}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 30000,
    });

    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ Critical MongoDB connection error:', error.message);
    process.exit(1);
  }
};
