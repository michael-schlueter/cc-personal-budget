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
exports.deleteTransaction = exports.updateTransaction = exports.getTransaction = exports.getAllTransactions = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// @desc    Get all transactions
// @route   GET /api/transactions
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield prisma.transactions.findMany();
        if (transactions.length < 1) {
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
        if (err.code === "P2023") {
            return res.status(500).send({
                message: 'Invalid transaction ID (Invalid UUID)'
            });
        }
        return res.status(500).send({
            message: err.message,
        });
    }
});
exports.getTransaction = getTransaction;
// @desc    Update a specific transaction
// @route   PUT /api/transactions/:id
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, amount } = req.body;
    try {
        if (title === "" || title == null || amount === "" || amount == null) {
            return res.status(400).send({
                message: "Title and/or budget not provided",
            });
        }
        if (amount < 0) {
            return res.status(400).send({
                message: "Invalid amount",
            });
        }
        const transactionToUpdate = yield prisma.transactions.findUnique({
            where: {
                id: id,
            },
        });
        if (!transactionToUpdate) {
            return res.status(404).send({
                message: "Transaction not found",
            });
        }
        const sendingEnvelope = yield prisma.envelopes.findUnique({
            where: {
                id: transactionToUpdate.sendingEnvelopeId,
            },
        });
        const receivingEnvelope = yield prisma.envelopes.findUnique({
            where: {
                id: transactionToUpdate.receivingEnvelopeId,
            },
        });
        if (!sendingEnvelope || !receivingEnvelope) {
            return res.status(404).send({
                message: "Sending or receiving envelope not found",
            });
        }
        const amountDifference = parseInt(amount) - transactionToUpdate.amount;
        const newSendingEnvelopeBudget = sendingEnvelope.budget - amountDifference;
        const newReceivingEnvelopeBudget = receivingEnvelope.budget + amountDifference;
        if (newSendingEnvelopeBudget < 0 || newReceivingEnvelopeBudget < 0) {
            return res.status(400).send({
                message: "Insufficient budget on one of the envelopes to update transaction",
            });
        }
        yield prisma.envelopes.update({
            where: {
                id: transactionToUpdate.sendingEnvelopeId,
            },
            data: {
                budget: newSendingEnvelopeBudget,
            },
        });
        yield prisma.envelopes.update({
            where: {
                id: transactionToUpdate.receivingEnvelopeId,
            },
            data: {
                budget: newReceivingEnvelopeBudget,
            },
        });
        const updatedTransaction = yield prisma.transactions.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                amount: parseInt(amount),
            },
        });
        return res.status(200).send(updatedTransaction);
    }
    catch (err) {
        if (err.code === "P2023") {
            return res.status(500).send({
                message: 'Invalid transaction ID (Invalid UUID)'
            });
        }
        res.status(500).send({
            message: err.message,
        });
    }
});
exports.updateTransaction = updateTransaction;
// @desc    Delete a specific transaction
// @route   DELETE /api/transactions/:id
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transactionToDelete = yield prisma.transactions.findUnique({
            where: {
                id: id,
            },
        });
        if (!transactionToDelete) {
            return res.status(404).send({
                message: "Transaction not found",
            });
        }
        const sendingEnvelope = yield prisma.envelopes.findUnique({
            where: {
                id: transactionToDelete.sendingEnvelopeId,
            },
        });
        const receivingEnvelope = yield prisma.envelopes.findUnique({
            where: {
                id: transactionToDelete.receivingEnvelopeId,
            },
        });
        if (!sendingEnvelope || !receivingEnvelope) {
            return res.status(404).send({
                message: "Sending or receiving envelope not found",
            });
        }
        if (transactionToDelete.amount > receivingEnvelope.budget) {
            return res.status(400).send({
                message: "Insufficient budget on receiving envelope to delete this transaction",
            });
        }
        yield prisma.envelopes.update({
            where: {
                id: transactionToDelete.sendingEnvelopeId,
            },
            data: {
                budget: sendingEnvelope.budget + transactionToDelete.amount,
            },
        });
        yield prisma.envelopes.update({
            where: {
                id: transactionToDelete.receivingEnvelopeId,
            },
            data: {
                budget: receivingEnvelope.budget - transactionToDelete.amount,
            },
        });
        yield prisma.transactions.delete({
            where: {
                id: id,
            },
        });
        res.sendStatus(204);
    }
    catch (err) {
        if (err.code === "P2023") {
            return res.status(500).send({
                message: 'Invalid transaction ID (Invalid UUID)'
            });
        }
        res.status(500).send({
            message: err.message,
        });
    }
});
exports.deleteTransaction = deleteTransaction;
//# sourceMappingURL=transactions.js.map