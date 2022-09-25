/*
  Warnings:

  - A unique constraint covering the columns `[sendingEnvelopeId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receivingEnvelopeId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transactions_sendingEnvelopeId_key" ON "Transactions"("sendingEnvelopeId");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_receivingEnvelopeId_key" ON "Transactions"("receivingEnvelopeId");
