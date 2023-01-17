import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Remove after development.
(async () => {
  const user = await prisma.user.findUnique({
    where: { email: "test@test.com" },
  });

  const boards = await prisma.boardUser.findMany({
    where: { userId: user.id },
    include: {
      board: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
})();
