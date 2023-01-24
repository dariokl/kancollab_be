import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { avatarStringBuilder } from "../../utils/avatars";
import db from "../../utils/db";

interface IRegister {
  email: string;
  password: string;
}

export const findUserByEmail = (email: string) =>
  db.user.findUnique({
    where: {
      email,
    },
  });

export const createUserWithEmail = async ({ email, password }: IRegister) => {
  const avatar = avatarStringBuilder();
  return db.user.create({
    data: {
      email,
      avatar,
      password: bcrypt.hashSync(password, 12),
    },
  });
};

export const findUserById = (id: string) =>
  db.user.findUnique({
    where: {
      id,
    },
  });

export const isBoardMember = async (id: string) => {
  const isMember = await db.boardUser.findFirstOrThrow({
    where: { userId: id },
  });

  if (isMember) {
    return true;
  }

  return false;
};
