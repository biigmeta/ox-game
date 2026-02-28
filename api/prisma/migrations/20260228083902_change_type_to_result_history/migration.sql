/*
  Warnings:

  - You are about to drop the column `type` on the `Histories` table. All the data in the column will be lost.
  - Added the required column `result` to the `Histories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameResult" AS ENUM ('win', 'lose', 'draw');

-- AlterTable
ALTER TABLE "Histories" DROP COLUMN "type",
ADD COLUMN     "result" "GameResult" NOT NULL;

-- DropEnum
DROP TYPE "HistoryType";
