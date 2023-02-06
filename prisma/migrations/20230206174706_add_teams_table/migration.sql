-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamUser" (
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 1
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamUser_userId_teamId_key" ON "TeamUser"("userId", "teamId");

-- AddForeignKey
ALTER TABLE "TeamUser" ADD CONSTRAINT "TeamUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamUser" ADD CONSTRAINT "TeamUser_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
