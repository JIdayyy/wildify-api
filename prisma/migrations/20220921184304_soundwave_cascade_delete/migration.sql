-- DropForeignKey
ALTER TABLE "SoundWave" DROP CONSTRAINT "SoundWave_songId_fkey";

-- AddForeignKey
ALTER TABLE "SoundWave" ADD CONSTRAINT "SoundWave_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
