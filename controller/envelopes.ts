const modelEnvelopes = require("../model/envelopes");
const { createId, findById, getIndex } = require("../utils/helpers");

// @desc    Get all envelopes
// @route   GET /api/envelopes
const getAllEnvelopes = async (req, res) => {
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
const getEnvelope = async (req, res) => {
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
const createEnvelope = async (req, res) => {
  try {
    const envelopes = await modelEnvelopes;
    const { title, budget } = req.body;
    const newId = createId(envelopes);

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
const updateEnvelope = async (req, res) => {
  try {
    const envelopes = await modelEnvelopes;
    const { id } = req.params;
    const envelopeToUpdate = findById(envelopes, id);
    const envelopeIdx = getIndex(envelopes, id);

    if (!envelopeToUpdate) {
      res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    const { title, budget } = req.body;

    if (title && budget) {
      const updatedEnvelope = {
        id: envelopeToUpdate.id,
        title,
        budget,
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
const deleteEnvelope = async (req, res) => {
  try {
    const envelopes = await modelEnvelopes;
    const { id } = req.params;
    const envelopeToDelete = findById(envelopes, id);
    const envelopeIdx = getIndex(envelopes, id);

    if (!envelopeToDelete) {
      res.status(404).send({
        message: "Envelope not found",
      });
    }

    envelopes.splice(envelopeIdx, 1);
    res.status(204).send(envelopes);
  } catch (err) {
    res.status(500).send(err);
  }
};

const transferBudget = async (req, res) => {
  try {
    const envelopes = await modelEnvelopes;
    const { fromId, toId } = req.params;
    const amount = parseInt(req.body.amount);

    const sendingEnvelope = findById(envelopes, fromId);
    const receivingEnvelope = findById(envelopes, toId);

    if (!sendingEnvelope || !receivingEnvelope) {
      res.status(404).send({
        message: "Envelope(s) not found",
      });
    }

    if (amount < 0) {
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

module.exports = {
  getAllEnvelopes,
  createEnvelope,
  getEnvelope,
  updateEnvelope,
  deleteEnvelope,
  transferBudget,
};
