import { Model } from 'mongoose';

import { Types } from 'mongoose';

export type TPurchase = {
  userId: string;
  bookId: Types.ObjectId;
  amount: number;
};

export interface PurchaseModel extends Model<TPurchase> {}
