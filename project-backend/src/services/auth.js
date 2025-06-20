import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/auth.js';
import bcrypt from 'bcrypt';
import SessionCollection from '../db/models/session.js';
import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { randomBytes } from 'node:crypto';

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
    const { password, ...rest } = payload;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Attempting to create user with payload:', {
      ...rest,
      password: '[HIDDEN]',
    });
    const user = await User.create({ ...rest, password: hashedPassword });
    console.log('User created successfully:', {
      ...user.toObject(),
      password: '[HIDDEN]',
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 11000) {
      throw createHttpError(409, 'An account with this email already exists');
    }
    throw error;
  }
};

// logout
export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const findSession = (query) => SessionCollection.findOne(query);

export const findUser = (query) => User.findOne(query);

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Email or password invalid!');
  }

  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    throw createHttpError(401, 'Email or password invalid!');
  }

  await SessionCollection.findOneAndDelete({ userId: user._id });

  const session = createSession();

  const newSession = await SessionCollection.create({
    userId: user._id,
    ...session,
  });

  return {
    newSession,
    user: {
      name: user.name,
      email: user.email,
    },
  };
};
