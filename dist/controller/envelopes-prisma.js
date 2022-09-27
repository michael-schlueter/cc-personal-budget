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
exports.getEnvelopeTransactions = exports.createTransaction = exports.deleteEnvelope = exports.updateEnvelope = exports.createEnvelope = exports.getEnvelope = exports.getAllEnvelopes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// @desc    Get all envelopes
// @route   GET /api/envelopes
const getAllEnvelopes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const envelopes = yield prisma.envelopes.findMany();
        if (envelopes.length < 1) {
            return res.status(404).send({
                message: "No envelopes found",
            });
        }
        return res.status(200).send(envelopes);
    }
    catch (err) {
        return res.status(500).send({
            error: err.message,
        });
    }
});
exports.getAllEnvelopes = getAllEnvelopes;
// @desc  Get a specific envelope
// @route Get /api/envelopes/:id
const getEnvelope = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const envelope = yield prisma.envelopes.findUnique({
            where: {
                id: id,
            },
        });
        if (!envelope) {
            return res.status(404).send({
                message: "Envelope Not Found",
            });
        }
        res.status(200).send(envelope);
    }
    catch (err) {
        if (err.code === "P2023") {
            return res.status(500).send({
                message: "Invalid envelope ID (Invalid UUID)",
            });
        }
        return res.status(500).send({
            error: err.message,
        });
    }
});
exports.getEnvelope = getEnvelope;
// @desc    Create an envelope
// @route   POST/api/envelopes
const createEnvelope = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, budget } = req.body;
    const envelopeBudget = parseInt(budget);
    try {
        if (title === "" || title == null || budget === "" || budget == null) {
            return res.status(400).send({
                message: "Title and/or budget not provided",
            });
        }
        if (isNaN(envelopeBudget)) {
            return res.status(400).send({
                message: "Budget has to be a number",
            });
        }
        if (envelopeBudget < 0) {
            return res.status(400).send({
                message: "Budget has to be positive",
            });
        }
        const newEnvelope = yield prisma.envelopes.create({
            data: {
                title: title,
                budget: envelopeBudget,
            },
        });
        return res.status(201).send(newEnvelope);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.createEnvelope = createEnvelope;
// @desc    Update an envelope
// @route   PUT/api/envelopes
const updateEnvelope = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, budget } = req.body;
    const envelopeBudget = parseInt(budget);
    try {
        if (title === "" || title == null || budget === "" || budget == null) {
            return res.status(400).send({
                message: "Title and/or budget not provided",
            });
        }
        if (isNaN(envelopeBudget)) {
            return res.status(400).send({
                message: "Budget has to be a number",
            });
        }
        if (envelopeBudget < 0) {
            return res.status(400).send({
                message: "Budget has to be positive",
            });
        }
        const updatedEnvelope = yield prisma.envelopes.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                budget: envelopeBudget,
            },
        });
        res.status(200).send(updatedEnvelope);
    }
    catch (err) {
        if (err.code === "P2023") {
            return res.status(500).send({
                message: "Invalid envelope ID (Invalid UUID)",
            });
        }
        res.status(500).send({
            error: err.message,
        });
    }
});
exports.updateEnvelope = updateEnvelope;
// @desc    Delete an envelope
// @route   DELETE/api/envelopes
const deleteEnvelope = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.envelopes.delete({
            where: {
                id: id,
            },
        });
        return res.status(204).send("Envelope deleted");
    }
    catch (err) {
        if (err.code === "P2023") {
            return res.status(500).send({
                message: "Invalid envelope ID (Invalid UUID)",
            });
        }
        return res.status(500).send({
            error: err.message,
        });
    }
});
exports.deleteEnvelope = deleteEnvelope;
// @desc    Create a transaction
// @route   POST/api/envelopes/:id/transactions
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, amount, receivingEnvelopeId } = req.body;
    const transactionAmount = parseInt(amount);
    try {
        if (title === "" || title == null || amount === "" || amount == null) {
            return res.status(400).send({
                message: "Title, amount and/or ID of receiving envelope not provided",
            });
        }
        if (isNaN(transactionAmount)) {
            return res.status(400).send({
                message: "Amount needs to be a number",
            });
        }
        if (transactionAmount < 0) {
            return res.status(400).send({
                message: "Invalid amount",
            });
        }
        const envelope = yield prisma.envelopes.findUnique({
            where: {
                id: id,
            },
        });
        const receivingEnvelope = yield prisma.envelopes.findUnique({
            where: {
                id: receivingEnvelopeId,
            },
        });
        if (!envelope || !receivingEnvelope) {
            return res.status(404).send({
                message: "Envelope not found",
            });
        }
        if (transactionAmount > envelope.budget) {
            return res.status(400).send({
                message: "Insufficient budget for transfer",
            });
        }
        const newTransaction = yield prisma.transactions.create({
            data: {
                title: title,
                amount: transactionAmount,
                sendingEnvelopeId: id,
                receivingEnvelopeId: receivingEnvelopeId,
            },
        });
        yield prisma.envelopes.update({
            where: {
                id: id,
            },
            data: {
                budget: envelope.budget - transactionAmount,
            },
        });
        yield prisma.envelopes.update({
            where: {
                id: receivingEnvelopeId,
            },
            data: {
                budget: receivingEnvelope.budget - transactionAmount,
            },
        });
        return res.status(201).send(newTransaction);
    }
    catch (err) {
        if (err.code === "P2023") {
            return res.status(500).send({
                message: "Invalid envelope ID (Invalid UUID)",
            });
        }
        return res.status(500).send({
            error: err.message,
        });
    }
});
exports.createTransaction = createTransaction;
// @desc    Get all transactions from an envelope
// @route   GET/api/envelopes/:id/transactions
const getEnvelopeTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transactions = yield prisma.transactions.findMany({
            where: {
                sendingEnvelopeId: id,
            },
        });
        if (transactions.length < 1) {
            return res.status(404).send({
                message: "No transactions found for this envelope",
            });
        }
        return res.status(200).send(transactions);
    }
    catch (err) {
        if (err.code === "P2023") {
            return res.status(500).send({
                message: "Invalid envelope ID (Invalid UUID)",
            });
        }
        return res.status(500).send({
            error: err.message,
        });
    }
});
exports.getEnvelopeTransactions = getEnvelopeTransactions;
//# sourceMappingURL=envelopes-prisma.js.map