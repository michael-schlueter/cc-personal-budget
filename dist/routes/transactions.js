"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactions_1 = require("../controller/transactions");
const transactionsRouter = express_1.default.Router();
transactionsRouter.get("/", transactions_1.getAllTransactions);
transactionsRouter.get("/:id", transactions_1.getTransaction);
transactionsRouter.delete("/:id", transactions_1.deleteTransaction);
transactionsRouter.put("/:id", transactions_1.updateTransaction);
module.exports = transactionsRouter;
//# sourceMappingURL=transactions.js.map