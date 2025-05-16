import createHttpError from 'http-errors';
import { randomBytes } from 'node:crypto';
import { UsersCollection } from '../db/models/user.js';
import SessionCollection from '../db/models/session.js';
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
    throw error;
  }
};

export const findSession = (query) => SessionCollection.findOne(query);

export const findUser = (query) => UsersCollection.findOne(query);

// export const loginUser = async (payload) => {
//   const { email, password } = payload;
//   const user = await findUser({ email });
//   if (!user) {
//     throw createHttpError(401, 'Email or password invalid');
//   }

//   if (password !== user.password) {
//     throw createHttpError(401, 'Email or password invalid');
//   }

//   await SessionCollection.findOneAndDelete({ userId: user._id });

//   const session = createSession();

//   return SessionCollection.create({
//     userId: user._id,
//     ...session,
//   });
// };
