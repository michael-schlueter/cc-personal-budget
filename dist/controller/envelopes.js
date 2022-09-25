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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferBudget = exports.deleteEnvelope = exports.updateEnvelope = exports.createEnvelope = exports.getEnvelope = exports.getAllEnvelopes = void 0;
const envelopes_1 = __importDefault(require("../model/envelopes"));
const helpers_1 = require("../utils/helpers");
// @desc    Get all envelopes
// @route   GET /api/envelopes
const getAllEnvelopes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Simulating DB retrieval
        const envelopes = yield envelopes_1.default;
        res.status(200).send(envelopes);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.getAllEnvelopes = getAllEnvelopes;
// @desc    Get a specific envelope
// @route   GET /api/envelopes/:id
const getEnvelope = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const envelopes = yield envelopes_1.default;
        const { id } = req.params;
        const retrievedEnvelope = (0, helpers_1.findById)(envelopes, id);
        if (!retrievedEnvelope) {
            res.status(404).send({
                message: "Envelope Not Found",
            });
        }
        res.status(200).send(retrievedEnvelope);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.getEnvelope = getEnvelope;
// @desc    Create an envelope
// @route   POST /api/envelopes
const createEnvelope = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const envelopes = yield envelopes_1.default;
        const { title, budget } = req.body;
        const envelopeBudget = parseInt(budget);
        const newId = (0, helpers_1.createId)(envelopes);
        if (!newId) {
            return res.status(400).send({
                message: "Invalid ID",
            });
        }
        if (!envelopeBudget) {
            return res.status(400).send({
                message: "Invalid Budget",
            });
        }
        const newEnvelope = {
            id: newId,
            title,
            budget,
        };
        envelopes.push(newEnvelope);
        return res.status(201).send(newEnvelope);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.createEnvelope = createEnvelope;
// @desc    Update an envelope
// @route   PUT /api/envelopes/:id
const updateEnvelope = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const envelopes = yield envelopes_1.default;
        const { id } = req.params;
        const envelopeToUpdate = (0, helpers_1.findById)(envelopes, id);
        const envelopeIdx = (0, helpers_1.getIndex)(envelopes, id);
        if (!envelopeToUpdate || !envelopeIdx) {
            return res.status(404).send({
                message: "Envelope Not Found",
            });
        }
        const { title, budget } = req.body;
        const envelopeBudget = parseInt(budget);
        if (!envelopeBudget) {
            return res.status(400).send({
                message: "Invalid Budget",
            });
        }
        if (title && budget) {
            const updatedEnvelope = {
                id: envelopeToUpdate.id,
                title,
                budget: envelopeBudget,
            };
            envelopes_1.default[envelopeIdx] = updatedEnvelope;
            res.status(200).send(updatedEnvelope);
        }
        else {
            res.status(400).send({
                message: "title and/or budget not provided",
            });
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.updateEnvelope = updateEnvelope;
// @desc    Delete an envelope
// @route   DELETE /api/envelopes/:id
const deleteEnvelope = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const envelopes = yield envelopes_1.default;
        const { id } = req.params;
        const envelopeToDelete = (0, helpers_1.findById)(envelopes, id);
        const envelopeIdx = (0, helpers_1.getIndex)(envelopes, id);
        if (!envelopeToDelete || !envelopeIdx) {
            return res.status(404).send({
                message: "Envelope not found",
            });
        }
        envelopes.splice(envelopeIdx, 1);
        res.status(204).send(envelopes);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.deleteEnvelope = deleteEnvelope;
const transferBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const envelopes = yield envelopes_1.default;
        const { fromId, toId } = req.params;
        const amount = parseInt(req.body.amount);
        const sendingEnvelope = (0, helpers_1.findById)(envelopes, fromId);
        const receivingEnvelope = (0, helpers_1.findById)(envelopes, toId);
        if (!sendingEnvelope || !receivingEnvelope) {
            return res.status(404).send({
                message: "Envelope(s) not found",
            });
        }
        if (amount < 0 || !amount) {
            res.status(400).send({
                message: "Invalid amount",
            });
        }
        if (amount > sendingEnvelope.budget) {
            res.status(400).send({
                message: "Insufficient budget for transfer",
            });
        }
        sendingEnvelope.budget -= amount;
        receivingEnvelope.budget += amount;
        res.status(201).send(receivingEnvelope);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.transferBudget = transferBudget;
//# sourceMappingURL=envelopes.js.map