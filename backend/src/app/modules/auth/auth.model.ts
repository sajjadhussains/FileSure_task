import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "./auth.interface";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    referralWord: { type: Types.ObjectId, ref: "ReferralWord" },
  },
  { timestamps: true }
);

// Automatically remove password when returning JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

userSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // Only hash password if it's been modified and not already hashed
  if (user.isModified("password") && user.password) {
    const saltRounds = Number(config.bcrypt_salt_rounds) || 12;
    user.password = await bcrypt.hash(user.password as string, saltRounds);
  }
  next();
});

export const User = model<TUser>("User", userSchema);
