/*
  Warnings:

  - Added the required column `streak` to the `Histories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Histories" ADD COLUMN     "streak" INTEGER NOT NULL;
