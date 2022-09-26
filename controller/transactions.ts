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
