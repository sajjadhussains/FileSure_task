import { Types } from "mongoose";

export interface TUser {
  name?: string;
  email: string;
  password?: string;
  referralWord?: Types.ObjectId;
}
