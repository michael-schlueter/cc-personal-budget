import express from "express";

import {
  getAllEnvelopes,
  getEnvelope,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
  createTransaction,
  getEnvelopeTransactions,
} from "../controller/envelopes-prisma";

const envelopesRouter = express.Router();

envelopesRouter.get("/", getAllEnvelopes);
envelopesRouter.get("/:id", getEnvelope);
envelopesRouter.post("/", createEnvelope);
envelopesRouter.put("/:id", updateEnvelope);
envelopesRouter.delete("/:id", deleteEnvelope);
envelopesRouter.post("/:id/transactions", createTransaction);
envelopesRouter.get("/:id/transactions", getEnvelopeTransactions);

module.exports = envelopesRouter;
