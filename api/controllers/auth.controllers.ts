import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../utils/jtw";
import { hashToken } from "../../utils/hash";
import {
  addRefreshTokenToWhiteList,
  deleteRefreshToken,
  findRefreshTokenById,
} from "../services/auth.services";
import {
  createUserWithEmail,
  findUserById,
  findUserByEmail,
} from "../services/user.services";

const { JWT_REFRESH_SECRET } = process.env;

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ message: "You must provide email and a password." });
      throw new Error("You must provide email and a password.");
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "Email already in use." });
      throw new Error("Email already in use");
    }

    const user = await createUserWithEmail({ email, password });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);

    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password required." });
      throw new Error("Email and password required.");
    }

    const user = await findUserByEmail(email);

    if (!user) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(403).json({ message: "Invalid login credentials" });
      throw new Error("Invalid login credentials.");
    }

    const jti = uuidv4();

    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: "Missing refresh token." });
      throw new Error("Missing refresh token.");
    }

    const { jti: tokenJti, userId } = jwt.verify(
      refreshToken,
      JWT_REFRESH_SECRET as string
    ) as JwtPayload;

    const token = await findRefreshTokenById(tokenJti as string);

    if (!token || token.revoked) {
      res.status(401).json({ message: "Unauthorized" });
      throw new Error("Unauthorized");
    }
    const newToken = hashToken(refreshToken);
    if (newToken !== token.hashedToken) {
      res.status(401).json({ message: "Unauthorized" });
      throw new Error("Unauthorized");
    }

    const user = await findUserById(userId as string);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      throw new Error("Unauthorized");
    }

    await deleteRefreshToken(token.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhiteList({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
};
