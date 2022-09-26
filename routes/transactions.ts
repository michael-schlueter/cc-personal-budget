import express from "express";

import { getAllTransactions } from "../controller/transactions";

const transactionsRouter = express.Router();

transactionsRouter.get("/", getAllTransactions);

module.exports = transactionsRouter;
