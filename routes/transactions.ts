import express from "express";

import { getAllTransactions, getTransaction } from "../controller/transactions";

const transactionsRouter = express.Router();

transactionsRouter.get("/", getAllTransactions);
transactionsRouter.get("/:id", getTransaction);

module.exports = transactionsRouter;
