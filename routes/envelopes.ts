import express from "express";
// const {
//   getAllEnvelopes,
//   getEnvelope,
//   createEnvelope,
//   updateEnvelope,
//   deleteEnvelope,
//   transferBudget,
// } = require("../controller/envelopes");
import {
  getAllEnvelopes,
  getEnvelope,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
  transferBudget,
} from "../controller/envelopes";

const envelopesRouter = express.Router();

envelopesRouter.get("/", getAllEnvelopes);
envelopesRouter.get("/:id", getEnvelope);
envelopesRouter.post("/", createEnvelope);
envelopesRouter.put("/:id", updateEnvelope);
envelopesRouter.delete("/:id", deleteEnvelope);
envelopesRouter.post("/:fromId/transfer/:toId", transferBudget);

module.exports = envelopesRouter;
