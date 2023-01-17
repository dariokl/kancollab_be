import db from "../../utils/db";

export const findUserBoardsById = (id: string) =>
  db.boardUser.findMany({
    where: { userId: id },
    select: {
      board: {
        select: {
          id: true,
          name: true,
          owner: true,
        },
      },
    },
  });
