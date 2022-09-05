import { Request, Response, NextFunction } from "express";
const modelEnvelopes = import("../model/envelopes");

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

module.exports = {
    getAllEnvelopes,
}
