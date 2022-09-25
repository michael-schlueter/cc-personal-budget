/*
  Warnings:

  - You are about to drop the `Envelope` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Envelope";

-- CreateTable
CREATE TABLE "Envelopes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,

    CONSTRAINT "Envelopes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Envelopes_title_key" ON "Envelopes"("title");
