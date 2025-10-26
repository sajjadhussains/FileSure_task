import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PurchaseServices } from './purchase.service';

const createPurchase = catchAsync(async (req: Request, res: Response) => {
  const { user, body } = req;
  await PurchaseServices.createPurchaseIntoDB(user, body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Purchase created successfully',
    data: null,
  });
});

export const PurchaseControllers = {
  createPurchase,
};
