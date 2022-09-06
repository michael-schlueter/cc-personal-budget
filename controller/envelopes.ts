import { Request, Response, NextFunction } from "express";
const modelEnvelopes = require("../model/envelopes");
const { createNewId } = require("../utils/helpers");

// @desc    Get all envelopes
// @route   GET /api/envelopes

const getAllEnvelopes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Mock retrieval via database
    const envelopes = await modelEnvelopes;
    res.status(200).send(envelopes);
    // ???????????? NEED TO CALL NEXT FUNCTION ????????????
  } catch (err) {
    res.status(400).send(err);
  }
};

// @desc  Create a new envelope
// @route POST /api/envelopes

const addEnvelope = async (req: Request, res: Response) => {
  try {
    const { title, budget } = req.body;
    const envelopes = await modelEnvelopes;
    const newId = createNewId();
    console.log(newId);
    const newEnvelope = {
      id: newId,
      title,
      budget,
    };
    envelopes.push(newEnvelope);
    res.status(201).send(newEnvelope);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllEnvelopes,
  addEnvelope,
};
