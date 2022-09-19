-- CreateTable
CREATE TABLE "SoundWave" (
    "id" TEXT NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "SoundWave_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SoundWave_songId_key" ON "SoundWave"("songId");

-- AddForeignKey
ALTER TABLE "SoundWave" ADD CONSTRAINT "SoundWave_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
