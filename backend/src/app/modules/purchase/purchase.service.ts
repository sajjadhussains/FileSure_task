import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Purchase } from './purchase.model';
import { TUser } from '../user/user.interface';
import { Referral } from '../referral/referral.model';
import { Book } from '../book/book.model';

const createPurchaseIntoDB = async (
  user: TUser,
  payload: { bookId: string },
) => {
  const { bookId } = payload;

  // Find the book and check stock
  const book = await Book.findById(bookId);
  if (!book) {
    throw new AppError(httpStatus.NOT_FOUND, 'Book not found!');
  }
  if (book.stock < 1) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Book is out of stock!');
  }

  const currentUser = await User.findOne({ email: user.email }).select(
    '+password',
  );
  if (!currentUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Create the purchase record
  await Purchase.create([
    {
      userId: currentUser.referralCode,
      bookId: book._id,
      amount: book.price,
    },
  ]);

  // Decrement book stock
  book.stock -= 1;
  await book.save();

  // Handle referral credits only on the first purchase
  if (!currentUser.isPurchased) {
    const referral = await Referral.findOne({
      referred: currentUser.referralCode,
    });

    if (referral) {
      const referrerUser = await User.findOne({
        referralCode: referral.referrer,
      }).select('+password');

      if (referrerUser) {
        referrerUser.credits += 2;
        currentUser.credits += 2;
        await referrerUser.save();

        referral.status = 'converted';
        await referral.save();

        // Mark the user as having made a purchase and save
        currentUser.isPurchased = true;
        await currentUser.save();
      }
    }
  }

  return null;
};

export const PurchaseServices = {
  createPurchaseIntoDB,
};
