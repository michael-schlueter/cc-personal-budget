"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const {
//   getAllEnvelopes,
//   getEnvelope,
//   createEnvelope,
//   updateEnvelope,
//   deleteEnvelope,
//   transferBudget,
// } = require("../controller/envelopes");
const envelopes_1 = require("../controller/envelopes");
const envelopesRouter = express_1.default.Router();
envelopesRouter.get("/", envelopes_1.getAllEnvelopes);
envelopesRouter.get("/:id", envelopes_1.getEnvelope);
envelopesRouter.post("/", envelopes_1.createEnvelope);
envelopesRouter.put("/:id", envelopes_1.updateEnvelope);
envelopesRouter.delete("/:id", envelopes_1.deleteEnvelope);
envelopesRouter.post("/:fromId/transfer/:toId", envelopes_1.transferBudget);
module.exports = envelopesRouter;
