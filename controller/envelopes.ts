import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// @desc    Get all envelopes
// @route   GET /api/envelopes
export const getAllEnvelopes = async (req: Request, res: Response) => {
  try {
    const envelopes = await prisma.envelopes.findMany();
    if (envelopes.length < 1) {
      return res.status(404).send({
        message: "No envelopes found",
      });
    }

    return res.status(200).send(envelopes);
  } catch (err: any) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc  Get a specific envelope
// @route Get /api/envelopes/:id
export const getEnvelope = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const envelope = await prisma.envelopes.findUnique({
      where: {
        id: id,
      },
    });

    if (!envelope) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    res.status(200).send(envelope);
  } catch (err: any) {
    if (err.code === "P2023") {
      return res.status(500).send({
        message: "Invalid envelope ID (Invalid UUID)",
      });
    }
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Create an envelope
// @route   POST/api/envelopes
export const createEnvelope = async (req: Request, res: Response) => {
  const { title, budget } = req.body;
  const envelopeBudget = parseInt(budget);

  try {
    if (title === "" || title == null || budget === "" || budget == null) {
      return res.status(400).send({
        message: "Title and/or budget not provided",
      });
    }

    if (isNaN(envelopeBudget)) {
      return res.status(400).send({
        message: "Budget has to be a number",
      });
    }

    if (envelopeBudget < 0) {
      return res.status(400).send({
        message: "Budget has to be positive",
      });
    }

    const newEnvelope = await prisma.envelopes.create({
      data: {
        title: title,
        budget: envelopeBudget,
      },
    });

    return res.status(201).send(newEnvelope);
  } catch (err: any) {
    return res.status(500).send(err);
  }
};

// @desc    Update an envelope
// @route   PUT/api/envelopes
export const updateEnvelope = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, budget } = req.body;
  const envelopeBudget = parseInt(budget);

  try {
    if (title === "" || title == null || budget === "" || budget == null) {
      return res.status(400).send({
        message: "Title and/or budget not provided",
      });
    }

    if (isNaN(envelopeBudget)) {
      return res.status(400).send({
        message: "Budget has to be a number",
      });
    }

    if (envelopeBudget < 0) {
      return res.status(400).send({
        message: "Budget has to be positive",
      });
    }

    const updatedEnvelope = await prisma.envelopes.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        budget: envelopeBudget,
      },
    });

    res.status(200).send(updatedEnvelope);
  } catch (err: any) {
    if (err.code === "P2023") {
      return res.status(500).send({
        message: "Invalid envelope ID (Invalid UUID)",
      });
    }
    if (err.code === "P2025") {
      return res.status(500).send({
        message: "Envelope ID not found",
      });
    }
    res.status(500).send({
      message: err.message,
    });
  }
};

// @desc    Delete an envelope
// @route   DELETE/api/envelopes
export const deleteEnvelope = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.envelopes.delete({
      where: {
        id: id,
      },
    });
    return res.sendStatus(204);
  } catch (err: any) {
    if (err.code === "P2023") {
      return res.status(500).send({
        message: "Invalid envelope ID (Invalid UUID)",
      });
    }
    if (err.code === "P2025") {
      return res.status(500).send({
        message: "Envelope ID not found",
      });
    }
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Create a transaction
// @route   POST/api/envelopes/:id/transactions
export const createTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, amount, receivingEnvelopeId } = req.body;
  const transactionAmount = parseInt(amount);

  try {
    if (title === "" || title == null || amount === "" || amount == null) {
      return res.status(400).send({
        message: "Title, amount and/or ID of receiving envelope not provided",
      });
    }

    if (isNaN(transactionAmount)) {
      return res.status(400).send({
        message: "Amount needs to be a number",
      });
    }

    if (transactionAmount < 0) {
      return res.status(400).send({
        message: "Invalid amount",
      });
    }

    const envelope = await prisma.envelopes.findUnique({
      where: {
        id: id,
      },
    });

    const receivingEnvelope = await prisma.envelopes.findUnique({
      where: {
        id: receivingEnvelopeId,
      },
    });

    if (!envelope || !receivingEnvelope) {
      return res.status(404).send({
        message: "Sending and/or receiving envelope not found",
      });
    }

    if (transactionAmount > envelope.budget) {
      return res.status(400).send({
        message: "Insufficient budget for transfer",
      });
    }

    const newTransaction = await prisma.transactions.create({
      data: {
        title: title,
        amount: transactionAmount,
        sendingEnvelopeId: id,
        receivingEnvelopeId: receivingEnvelopeId,
      },
    });

    await prisma.envelopes.update({
      where: {
        id: id,
      },
      data: {
        budget: envelope.budget - transactionAmount,
      },
    });

    await prisma.envelopes.update({
      where: {
        id: receivingEnvelopeId,
      },
      data: {
        budget: receivingEnvelope.budget - transactionAmount,
      },
    });

    return res.status(201).send(newTransaction);
  } catch (err: any) {
    if (err.code === "P2023") {
      return res.status(500).send({
        message: "Invalid envelope ID (Invalid UUID)",
      });
    }
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Get all transactions from an envelope
// @route   GET/api/envelopes/:id/transactions
export const getEnvelopeTransactions = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        sendingEnvelopeId: id,
      },
    });

    if (transactions.length < 1) {
      return res.status(404).send({
        message: "No transactions found for this envelope",
      });
    }
    return res.status(200).send(transactions);
  } catch (err: any) {
    if (err.code === "P2023") {
      return res.status(500).send({
        message: "Invalid envelope ID (Invalid UUID)",
      });
    }
    return res.status(500).send({
      error: err.message,
    });
  }
};
