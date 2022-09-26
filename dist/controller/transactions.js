"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransaction = exports.getAllTransactions = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// @desc    Get all transactions
// @route   GET /api/transactions
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield prisma.transactions.findMany();
        if (!transactions) {
            return res.status(404).send({
                message: "No transactions found",
            });
        }
        return res.status(200).send(transactions);
    }
    catch (err) {
        return res.status(500).send({
            error: err.message,
        });
    }
});
exports.getAllTransactions = getAllTransactions;
// @desc    Get a specific transaction
// @route   GET /api/transactions/:id
const getTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transaction = yield prisma.transactions.findUnique({
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
    }
    catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
});
exports.getTransaction = getTransaction;
//# sourceMappingURL=transactions.js.map