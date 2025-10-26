import { Document, Model } from 'mongoose';

export type TUserDoc = TUser & Document;

export type TUser = {
  name: string;
  email: string;
  password?: string;
  credits: number;
  referralCode: string;
  referredBy?: string;
  isPurchased?: boolean;
};

export interface UserModel extends Model<TUserDoc> {
  isUserExistsByEmail(email: string): Promise<TUserDoc | null>;
}
