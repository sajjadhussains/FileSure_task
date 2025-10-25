import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './auth.interface';
import { User } from './auth.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ id: payload.id });

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!');
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TUser) => {
  const user = await User.findOne({ id: payload.id }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password as string,
    user.password as string,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials!');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, 'my-secret', {
    expiresIn: '10d',
  });

  return {
    accessToken,
    user,
  };
};

export const AuthService = {
  createUserIntoDB,
  loginUser,
};
