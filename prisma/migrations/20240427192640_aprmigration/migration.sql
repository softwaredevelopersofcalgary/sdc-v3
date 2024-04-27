/*
  Warnings:

  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.
  - Added the required column `superProjectId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_authorId_idx";

-- DropIndex
DROP INDEX "Tech_projectId_idx";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "image";
ALTER TABLE "Project" ADD COLUMN     "superProjectId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Tech" ADD COLUMN     "superProjectId" STRING;

-- CreateTable
CREATE TABLE "SuperProject" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "link" STRING,
    "image" STRING,
    "authorId" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" STRING NOT NULL,

    CONSTRAINT "SuperProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SuperProject_authorId_idx" ON "SuperProject"("authorId");

-- CreateIndex
CREATE INDEX "Tech_superProjectId_idx" ON "Tech"("superProjectId");
