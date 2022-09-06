"use strict";
const express = require("express");
const { getAllEnvelopes, addEnvelope } = require("../controller/envelopes");
const envelopesRouter = express.Router();
envelopesRouter.get("/", getAllEnvelopes);
envelopesRouter.post("/", addEnvelope);
module.exports = envelopesRouter;
