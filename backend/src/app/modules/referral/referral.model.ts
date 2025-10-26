import { Schema, model } from 'mongoose';
import { ReferralModel, TReferral } from './referral.interface';

const referralSchema = new Schema<TReferral, ReferralModel>(
  {
    referrer: {
      type: String,
      required: true,
    },
    referred: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'converted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export const Referral = model<TReferral, ReferralModel>(
  'Referral',
  referralSchema,
);
