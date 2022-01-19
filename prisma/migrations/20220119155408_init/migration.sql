-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "claimedBy" TEXT,
    "movie" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);
