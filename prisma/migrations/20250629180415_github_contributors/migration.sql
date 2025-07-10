-- CreateTable
CREATE TABLE "Contributor" (
    "id" STRING NOT NULL,
    "githubLogin" STRING NOT NULL,
    "name" STRING,
    "imgUrl" STRING,
    "contributions" INT4 NOT NULL,
    "sortRank" INT4 NOT NULL,
    "showPublic" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "githubUrl" STRING,
    "lastFetched" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contributor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contributor_githubLogin_key" ON "Contributor"("githubLogin");
