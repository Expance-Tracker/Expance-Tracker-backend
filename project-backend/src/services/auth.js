import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import SessionCollection from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/auth.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = Date.now() + accessTokenLifeTime;
  const refreshTokenValidUntil = Date.now() + refreshTokenLifeTime;

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const registerUser = async (payload) => {
  try {
    console.log('Attempting to create user with payload:', payload);
    const user = await UsersCollection.create(payload);
    console.log('User created successfully:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
if (error.code === 11000) {
      throw createHttpError(409, 'An account with this email already exists');
    }
    throw error;
  }
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const user = UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Email or password invalid!');
  }

  //const comparedPassword = bcrypt.compare(password, user.password);
  // if (!comparedPassword) {
  //   throw createHttpError(401, 'Email or password invalid!');
  // }

  if (password !== user.password) {
    throw createHttpError(401, 'Email or password invalid!');
  }

  await SessionCollection.findOneAndDelete({ userId: user._id });

  const session = createSession();

  return SessionCollection.create({
    userId: user._id,
    ...session,
  });
};
