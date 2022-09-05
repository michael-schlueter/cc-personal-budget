const express = require('express');
const { getAllEnvelopes } = require('../controller/envelopes');

const envelopesRouter = express.Router();

envelopesRouter.get("/", getAllEnvelopes);

module.exports = envelopesRouter;