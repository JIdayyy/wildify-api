/*
  Warnings:

  - You are about to drop the column `s3_link` on the `Song` table. All the data in the column will be lost.
  - Added the required column `link` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "s3_link",
ADD COLUMN     "link" TEXT NOT NULL;
