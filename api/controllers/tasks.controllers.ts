import { Request, Response, NextFunction } from "express";
import {
  createTask as createTaskService,
  updateTaskSection,
} from "../services/tasks.services";
import { findUserByEmail } from "../services/user.services";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assignee: email } = req.body;

    const userExist = await findUserByEmail(email);

    if (!userExist) {
      res.status(400).json({ message: `User with ${email} does not exist !` });
      throw new Error(`User with ${email} does not exist !`);
    }

    const task = await createTaskService({ ...req.body });

    res.status(200).json({ message: "Successfully created new task." });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { updateId, taskId } = req.body;

    if (!updateId || !taskId) {
      return res
        .status(400)
        .json({ message: "Ivalid data, request was not successful !" });
    }

    await updateTaskSection(req.body);

    res.status(200).json({ message: "Successfully updated the task !" });
  } catch (err) {
    next(err);
  }
};
