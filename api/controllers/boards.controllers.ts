import { Request, Response, NextFunction } from "express";
import { createNewBoard, getBoardById } from "../services/boards.services";
import { findUserById, isBoardMember } from "../services/user.services";

interface IJWTPayload {
  userId: string;
}

export const createBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.payload as IJWTPayload;
    const { name } = req.body;

    const user = await findUserById(userId);

    if (!user) {
      res.status(400).json({ message: "User doesnt exist." });
      throw new Error("User doesnt exist.");
    }

    if (!name) {
      res.status(400).json({ message: "Name is required." });
      throw new Error("Name is required.");
    }

    await createNewBoard({ id: user.id, name, owner: user.email });
    res.status(200).json({ message: "Successfully created new board." });
  } catch (err) {
    next(err);
  }
};

export const boardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.payload as IJWTPayload;
    const id: string = req.params.id as string;

    const user = await findUserById(userId);

    if (!user) {
      res.status(400).json({ message: "User doesnt exist" });
      throw new Error("User doesnt exist.");
    }

    if (!isBoardMember(userId)) {
      res
        .status(403)
        .json({ message: "Access forbidden, user is not member of board." });

      throw new Error("Access forbidden, user is not member of board.");
    }

    const { board } = await getBoardById({ id, userId });

    res.status(200).json({ board });
  } catch (err) {
    next(err);
  }
};
