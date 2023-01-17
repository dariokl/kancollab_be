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
    const { name, description, members } = req.body;

    const user = await findUserById(userId);

    if (!user) {
      res.status(400).json({ message: "User doesnt exist" });
      throw new Error("User doesnt exist.");
    }

    if (!name || !description) {
      res.status(400).json({ message: "Name and description are required." });
      throw new Error("Invalid login credentials.");
    }

    const board = await createNewBoard({
      id: userId,
      name,
      description,
      owner: user.email,
    });

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
