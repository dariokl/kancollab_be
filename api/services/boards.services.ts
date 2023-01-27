import db from "../../utils/db";

interface ICreateBoard {
  id: string;
  name: string;
  owner: string;
}

export const createNewBoard = ({ id, name, owner }: ICreateBoard) =>
  db.board.create({
    data: {
      name,
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
      sections: {
        include: {
          tasks: {
            include: {
              user: {
                select: {
                  email: true,
                  avatar: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return { board };
};
