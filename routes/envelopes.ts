const express = require("express");
const {
  getAllEnvelopes,
  getEnvelope,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
  transferBudget,
} = require("../controller/envelopes");

const envelopesRouter = express.Router();

envelopesRouter.get("/", getAllEnvelopes);
envelopesRouter.get("/:id", getEnvelope);
envelopesRouter.post("/", createEnvelope);
envelopesRouter.put("/:id", updateEnvelope);
envelopesRouter.delete("/:id", deleteEnvelope);
envelopesRouter.post("/:fromId/transfer/:toId", transferBudget);

module.exports = envelopesRouter;
