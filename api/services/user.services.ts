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

/*
 * Automaticly create user and its team
 * Since currently user can be owners only of one team
 * TODO: Revisit functionality once its needed
 */
export const createUserWithEmail = async ({ email, password }: IRegister) => {
  const avatar = avatarStringBuilder();
  const user = await db.user.create({
    data: {
      email,
      avatar,
      password: bcrypt.hashSync(password, 12),
    },
  });

  const team = await db.team.create({
    data: {
      TeamUser: {
        create: {
          userId: user.id,
          role: 0,
        },
      },
    },
  });

  return user;
};

export const findUserById = (id: string) =>
  db.user.findUnique({
    where: {
      id,
    },
  });

export const findUserTeamById = (id: string) =>
  db.teamUser.findFirstOrThrow({
    where: { userId: id },
    select: {
      teamId: true,
      role: true,
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
