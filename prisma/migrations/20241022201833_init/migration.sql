-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
