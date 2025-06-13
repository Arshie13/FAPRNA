-- CreateEnum
CREATE TYPE "NewsType" AS ENUM ('EVENT', 'RECOGNITION', 'TEAM');

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "type" "NewsType" NOT NULL,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ceus" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "expected_attendees" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "isLatest" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
