/*
  Warnings:

  - Added the required column `chapterId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "chapterId" STRING NOT NULL;


-- CreateTable
CREATE TABLE "Chapter" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);
