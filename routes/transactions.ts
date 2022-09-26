import express from "express";

import {
  getAllTransactions,
  getTransaction,
  deleteTransaction,
} from "../controller/transactions";

const transactionsRouter = express.Router();

transactionsRouter.get("/", getAllTransactions);
transactionsRouter.get("/:id", getTransaction);
transactionsRouter.delete("/:id", deleteTransaction);

module.exports = transactionsRouter;
