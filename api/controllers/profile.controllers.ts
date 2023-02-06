import { Request, Response, NextFunction } from "express";
import { findUserById, findUserTeamById } from "../services/user.services";

interface IJWTPayload {
  userId: string;
}

export const getMyprofile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.payload as IJWTPayload;

    const user = await findUserById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const team = await findUserTeamById(userId);

    if (!team) {
      res.status(404);
      throw new Error("Team not found");
    }

    res.status(200).json({
      user: { email: user.email, avatar: user.avatar },
      team: { ...team },
    });
  } catch (err) {
    next(err);
  }
};
