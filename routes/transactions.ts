import express from "express";

import {
  getAllTransactions,
  getTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controller/transactions";

const transactionsRouter = express.Router();

transactionsRouter.get("/", getAllTransactions);
transactionsRouter.get("/:id", getTransaction);
transactionsRouter.delete("/:id", deleteTransaction);
transactionsRouter.put("/:id", updateTransaction);

module.exports = transactionsRouter;
