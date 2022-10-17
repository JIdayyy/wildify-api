/*
  Warnings:

  - Made the column `artistId` on table `Album` required. This step will fail if there are existing NULL values in that column.
  - Made the column `artistId` on table `Song` required. This step will fail if there are existing NULL values in that column.
  - Made the column `albumId` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "artistId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "artistId" SET NOT NULL,
ALTER COLUMN "albumId" SET NOT NULL;
