/*
  Warnings:

  - The primary key for the `Authentications` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "Authentications" DROP CONSTRAINT "Authentications_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Authentications_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Authentications_id_seq";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
