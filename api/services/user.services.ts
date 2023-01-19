import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
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
  const avatar = await generateAvatarUrl(email);
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

const generateAvatarUrl = async (emailAddress: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedInfo = await bcrypt.hash(emailAddress, salt);
  return `https://www.gravatar.com/avatar/${hashedInfo}?d=retro`;
};
