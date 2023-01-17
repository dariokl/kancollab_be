import db from "../../utils/db";

interface ICreateBoard {
  id: string;
  name: string;
  description: string;
  owner: string;
}

export const createNewBoard = ({
  id,
  name,
  description,
  owner,
}: ICreateBoard) =>
  db.board.create({
    data: {
      name,
      description,
      owner,
      BoardUsers: {
        create: {
          userId: id,
          role: 0,
        },
      },
      sections: {
        create: [
          {
            name: "To Do",
          },
          {
            name: "In Progress",
          },
          {
            name: "Done",
          },
        ],
      },
    },
  });

export const getBoardById = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const board = await db.board.findFirst({
    where: { id },
    select: {
      owner: true,
      name: true,
      id: true,
      description: true,
      sections: {
        include: {
          tasks: true,
        },
      },
    },
  });

  return { board };
};
