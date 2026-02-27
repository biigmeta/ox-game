-- CreateEnum
CREATE TYPE "Player" AS ENUM ('X', 'O');

-- CreateEnum
CREATE TYPE "ScoreType" AS ENUM ('win', 'lose', 'draw', 'extra');

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Histories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "player" "Player" NOT NULL,
    "result" "ScoreType" NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Histories" ADD CONSTRAINT "Histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
