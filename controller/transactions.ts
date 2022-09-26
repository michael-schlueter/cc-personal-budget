import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// @desc    Get all transactions
// @route   GET /api/transactions
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transactions.findMany();

    if (!transactions) {
      return res.status(404).send({
        message: "No transactions found",
      });
    }

    return res.status(200).send(transactions);
  } catch (err: any) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Get a specific transaction
// @route   GET /api/transactions/:id
export const getTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transactions.findUnique({
      where: {
        id: id,
      },
    });

    if (!transaction) {
      return res.status(404).send({
        message: "Transaction not found",
      });
    }

    return res.status(200).send(transaction);
  } catch (err: any) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

// @desc    Delete a specific transaction
// @route   DELETE /api/transactions/:id
export const deleteTransaction = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const transactionToDelete = await prisma.transactions.findUnique({
            where: {
                id: id
            }
        })

        if (!transactionToDelete) {
            return res.status(404).send({
                message: "Transaction not found",
            })
        }

        const sendingEnvelope = await prisma.envelopes.findUnique({
            where: {
                id: transactionToDelete.sendingEnvelopeId
            }
        })

        const receivingEnvelope = await prisma.envelopes.findUnique({
            where: {
                id: transactionToDelete.receivingEnvelopeId
            }
        })

        if (!sendingEnvelope || !receivingEnvelope) {
            return res.status(404).send({
                message: "Sending or receiving envelope not found"
            })
        }

        if (transactionToDelete.amount > receivingEnvelope.budget) {
            return res.status(400).send({
                message: "Insufficient budget on receiving envelope to delete this transaction"
            })
        }

        await prisma.envelopes.update({
            where: {
                id: transactionToDelete.sendingEnvelopeId
            },
            data: {
                budget: sendingEnvelope.budget + transactionToDelete.amount
            }
        })

        await prisma.envelopes.update({
            where: {
                id: transactionToDelete.receivingEnvelopeId
            },
            data: {
                budget: receivingEnvelope.budget - transactionToDelete.amount
            }
        })

        await prisma.transactions.delete({
            where: {
                id: id
            }
        })

        res.sendStatus(204);
    } catch (err: any) {
        res.status(500).send({
            message: err.message,
        })
    }
}