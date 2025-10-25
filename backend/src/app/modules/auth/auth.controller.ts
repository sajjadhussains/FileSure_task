import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await AuthService.createUserIntoDB(userData);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const { accessToken, user } = await AuthService.loginUser(loginData);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: {
      user,
      token: accessToken,
    },
  });
});

export const AuthController = {
  createUser,
  loginUser,
};
