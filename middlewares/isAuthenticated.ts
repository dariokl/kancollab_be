import { Request, NextFunction, Response } from "express";

import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "Un-authorized" });
    throw new Error("Un-Authorized");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err) {
    res.status(401).json({ message: "Un-authorized" });
    if (err.name === "TokenExpiredError") {
      throw new Error(err.name);
    }
    throw new Error("Un-Authorized");
  }

  return next();
};
