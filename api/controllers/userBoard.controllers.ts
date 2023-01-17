import { Request, Response, NextFunction } from "express";
import { findUserById } from "../services/user.services";
import { findUserBoardsById } from "../services/userBoards.services";

interface IJWTPayload {
  userId: string;
}

export const getMyBoards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.payload as IJWTPayload;

  try {
    const user = await findUserById(userId);
    if (!user) {
      res.status(400).json({ message: "User doesnt exist" });
      throw new Error("User doesnt exist");
    }
    const boards = await findUserBoardsById(userId);

    res.status(200).json({ boards });
  } catch (err) {
    next(err);
  }
};
