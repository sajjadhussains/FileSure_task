import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, TUserDoc, UserModel } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUserDoc, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    credits: {
      type: Number,
      default: 0,
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
    },
    referredBy: {
      type: String,
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// pre save middleware / hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password as string,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// post save middleware / hook
userSchema.post('save', function (doc, next) {
  // this hook is for removing password from the response, not for mutating the doc
  // doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

export const User = model<TUserDoc, UserModel>('User', userSchema);
