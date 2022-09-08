import { Request, Response } from "express";
import modelEnvelopes from "../model/envelopes";
import { createId, findById, getIndex } from "../utils/helpers";

// @desc    Get all envelopes
// @route   GET /api/envelopes
export const getAllEnvelopes = async (req: Request, res: Response) => {
  try {
    // Simulating DB retrieval
    const envelopes = await modelEnvelopes;
    res.status(200).send(envelopes);
  } catch (err) {
    res.status(400).send(err);
  }
};

// @desc    Get a specific envelope
// @route   GET /api/envelopes/:id
export const getEnvelope = async (req: Request, res: Response) => {
  try {
    const envelopes = await modelEnvelopes;
    const { id } = req.params;
    const retrievedEnvelope = findById(envelopes, id);

    if (!retrievedEnvelope) {
      res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    res.status(200).send(retrievedEnvelope);
  } catch (err) {
    res.status(500).send(err);
  }
};

// @desc    Create an envelope
// @route   POST /api/envelopes
export const createEnvelope = async (req: Request, res: Response) => {
  try {
    const envelopes = await modelEnvelopes;
    const { title, budget } = req.body;
    const envelopeBudget = parseInt(budget);
    const newId = createId(envelopes);

    if (!newId) {
      return res.status(400).send({
        message: "Invalid ID",
      });
    }

    if (!envelopeBudget) {
      return res.status(400).send({
        message: "Invalid Budget",
      });
    }

    const newEnvelope = {
      id: newId,
      title,
      budget,
    };

    envelopes.push(newEnvelope);
    return res.status(201).send(newEnvelope);
  } catch (err) {
    res.status(500).send(err);
  }
};

// @desc    Update an envelope
// @route   PUT /api/envelopes/:id
export const updateEnvelope = async (req: Request, res: Response) => {
  try {
    const envelopes = await modelEnvelopes;
    const { id } = req.params;
    const envelopeToUpdate = findById(envelopes, id);
    const envelopeIdx = getIndex(envelopes, id);

    if (!envelopeToUpdate || !envelopeIdx) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    const { title, budget } = req.body;
    const envelopeBudget = parseInt(budget);

    if (!envelopeBudget) {
      return res.status(400).send({
        message: "Invalid Budget",
      });
    }

    if (title && budget) {
      const updatedEnvelope = {
        id: envelopeToUpdate.id,
        title,
        budget: envelopeBudget,
      };

      modelEnvelopes[envelopeIdx] = updatedEnvelope;
      res.status(200).send(updatedEnvelope);
    } else {
      res.status(400).send({
        message: "title and/or budget not provided",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// @desc    Delete an envelope
// @route   DELETE /api/envelopes/:id
export const deleteEnvelope = async (req: Request, res: Response) => {
  try {
    const envelopes = await modelEnvelopes;
    const { id } = req.params;
    const envelopeToDelete = findById(envelopes, id);
    const envelopeIdx = getIndex(envelopes, id);

    if (!envelopeToDelete || !envelopeIdx) {
      return res.status(404).send({
        message: "Envelope not found",
      });
    }

    envelopes.splice(envelopeIdx, 1);
    res.status(204).send(envelopes);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const transferBudget = async (req: Request, res: Response) => {
  try {
    const envelopes = await modelEnvelopes;
    const { fromId, toId } = req.params;
    const amount = parseInt(req.body.amount);

    const sendingEnvelope = findById(envelopes, fromId);
    const receivingEnvelope = findById(envelopes, toId);

    if (!sendingEnvelope || !receivingEnvelope) {
      return res.status(404).send({
        message: "Envelope(s) not found",
      });
    }

    if (amount < 0 || !amount) {
      res.status(400).send({
        message: "Invalid amount",
      });
    }

    if (amount > sendingEnvelope.budget) {
      res.status(400).send({
        message: "Insufficient budget for transfer",
      });
    }

    sendingEnvelope.budget -= amount;
    receivingEnvelope.budget += amount;

    res.status(201).send(receivingEnvelope);
  } catch (err) {
    res.status(500).send(err);
  }
};
