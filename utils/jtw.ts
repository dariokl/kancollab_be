import jwt from "jsonwebtoken";
import { IRefreshTokens, IUser } from "../types/user";
import { config } from "dotenv";
config();

const { JWT_REFRESH_SECRET, JWT_ACCESS_SECRET } = process.env;

export const generateAccessToken = ({ id }: { id: string }): string =>
  jwt.sign({ userId: id }, JWT_ACCESS_SECRET as string, {
    expiresIn: "10m",
  });

export const generateRefreshToken = (
  { id }: { id: string },
  jti: string
): string =>
  jwt.sign(
    {
      userId: id,
      jti,
    },
    JWT_REFRESH_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

export const generateTokens = (user: IUser, jti: string): IRefreshTokens => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};
