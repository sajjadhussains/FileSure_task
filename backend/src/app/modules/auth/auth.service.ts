import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./auth.interface";
import { User } from "./auth.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config";
import { generateUniqueReferralWord } from "../referralWord/referralWord.utils";

const createUserIntoDB = async (payload: Partial<TUser>) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists!");
  }

  // Generate and link referral word
  const referralId = await generateUniqueReferralWord();

  // Let the model's pre-save hook handle password hashing
  const newUser = await User.create({
    ...payload,
    referralWord: referralId,
  });

  const userObject = newUser.toObject();
  delete userObject.password;
  return userObject;
};

const loginUser = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email })
    .select("+password")
    .populate("referralWord");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password as string,
    user.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Invalid credentials!");
  }

  const jwtPayload = {
    name: user.name,
    email: user.email,
  };
  // delete user.password;
  const jwtSecret = config.jwt_access_secret || "my-secret";
  const accessToken = jwt.sign(jwtPayload, jwtSecret, {
    expiresIn: "1d",
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
