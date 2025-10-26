import { Model } from 'mongoose';

export type TReferral = {
  referrer: string; // referral code of the user who referred
  referred: string; // referral code of the user who was referred
  status: 'pending' | 'converted';
};

export interface ReferralModel extends Model<TReferral> {}
