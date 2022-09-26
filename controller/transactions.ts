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
