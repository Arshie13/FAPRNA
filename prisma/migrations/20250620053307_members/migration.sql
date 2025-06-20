/*
  Warnings:

  - You are about to drop the column `userId` on the `EventUser` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `memberId` to the `EventUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventUser" DROP CONSTRAINT "EventUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Nomination" DROP CONSTRAINT "Nomination_nominatorId_fkey";

-- DropForeignKey
ALTER TABLE "Nomination" DROP CONSTRAINT "Nomination_nominee1Id_fkey";

-- DropForeignKey
ALTER TABLE "Nomination" DROP CONSTRAINT "Nomination_nominee2Id_fkey";

-- DropForeignKey
ALTER TABLE "Nomination" DROP CONSTRAINT "Nomination_nominee3Id_fkey";

-- AlterTable
ALTER TABLE "EventUser" DROP COLUMN "userId",
ADD COLUMN     "memberId" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "membershipStatus" "MembershipStatus" NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventUser" ADD CONSTRAINT "EventUser_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_nominatorId_fkey" FOREIGN KEY ("nominatorId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_nominee1Id_fkey" FOREIGN KEY ("nominee1Id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_nominee2Id_fkey" FOREIGN KEY ("nominee2Id") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_nominee3Id_fkey" FOREIGN KEY ("nominee3Id") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
