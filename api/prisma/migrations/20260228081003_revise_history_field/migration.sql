/*
  Warnings:

  - You are about to drop the column `result` on the `Histories` table. All the data in the column will be lost.
  - Added the required column `total` to the `Histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Histories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HistoryType" AS ENUM ('win', 'lose', 'draw', 'extra');

-- AlterTable
ALTER TABLE "Histories" DROP COLUMN "result",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "total" INTEGER NOT NULL,
ADD COLUMN     "type" "HistoryType" NOT NULL;

-- DropEnum
DROP TYPE "ScoreType";
