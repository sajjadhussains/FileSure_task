import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidations.userLoginValidationSchema),
  UserControllers.loginUser,
);

router.get(
  '/me/stats',
  auth(),
  UserControllers.getMyReferralStats,
);

export const UserRoutes = router;
