import jwt, { SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  } as SignOptions);
};
