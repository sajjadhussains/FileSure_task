import httpStatus from 'http-status';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import { nanoid } from 'nanoid';
// import { Referral } from '../referral/referral.model';
// import { TLoginUser } from './user.constant';
import bcrypt from 'bcrypt';
// import { createToken } from './user.utils';
import config from '../../config';
import { Referral } from '../referral/referral.model';
import { TLoginUser } from './user.constant';
import { createToken } from './user.utils';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  // if the user is found, throw an error
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!');
  }

  // generate a unique referral code
  payload.referralCode = nanoid(10);

  const newUser = await User.create(payload);

  // if the new user was referred by someone, create a referral record
  if (payload.referredBy) {
    await Referral.create({
      referrer: payload.referredBy,
      referred: newUser.referralCode,
    });
  }

  return newUser;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password as string,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match!');
  }

  const jwtPayload = {
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
     config.jwt_access_expires_in || '1d',

  );

  return {
    accessToken,
  };
};

const getMyReferralStatsFromDB = async (user: TUser) => {
  const referrals = await Referral.find({ referrer: user.referralCode });

  const referredUsers = referrals.length;
  const convertedUsers = referrals.filter(
    (r) => r.status === 'converted',
  ).length;
  const totalCreditsEarned = convertedUsers * 2;

  return {
    referredUsers,
    convertedUsers,
    totalCreditsEarned,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  getMyReferralStatsFromDB,
};
