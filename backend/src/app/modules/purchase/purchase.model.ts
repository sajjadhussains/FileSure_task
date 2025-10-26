import { Schema, model } from 'mongoose';
import { PurchaseModel, TPurchase } from './purchase.interface';

const purchaseSchema = new Schema<TPurchase, PurchaseModel>(
  {
    userId: {
      type: String,
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Book',
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Purchase = model<TPurchase, PurchaseModel>(
  'Purchase',
  purchaseSchema,
);
