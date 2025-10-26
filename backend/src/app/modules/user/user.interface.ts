import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  password?: string;
  credits: number;
  referralCode: string;
  referredBy?: string;
  isPurchased?: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;
}
