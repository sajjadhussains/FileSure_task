import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser } from './auth.interface';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ['user', 'admin'], required: true },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password as string,
      Number(12),
    );
  }
  next();
});

export const User = model<TUser>('User', userSchema);
