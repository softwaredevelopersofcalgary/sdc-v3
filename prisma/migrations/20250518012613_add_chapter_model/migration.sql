-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "chapterId" DROP NOT NULL;

-- DropEnum
DROP TYPE "crdb_internal_region";
