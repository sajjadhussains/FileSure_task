import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PurchaseControllers } from './purchase.controller';
import { PurchaseValidations } from './purchase.validation';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(PurchaseValidations.purchaseValidationSchema),
  PurchaseControllers.createPurchase,
);

export const PurchaseRoutes = router;
