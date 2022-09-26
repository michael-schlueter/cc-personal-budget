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
exports.createEnvelope = exports.getEnvelope = exports.getAllEnvelopes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// @desc    Get all envelopes
// @route   GET /api/envelopes
const getAllEnvelopes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const envelopes = yield prisma.envelopes.findMany();
        if (!envelopes) {
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
                id: id
            }
        });
        if (!envelope) {
            return res.status(404).send({
                message: "Envelope Not Found",
            });
        }
        res.status(200).send(envelope);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
});
exports.getEnvelope = getEnvelope;
// @desc    Create an envelope
// @route   POST/api/envelopes
const createEnvelope = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, budget } = req.body;
    try {
        if (title === "" || title == null || budget === "" || budget == null) {
            return res.status(400).send({
                message: "Title and/or budget not provided",
            });
        }
        const newEnvelope = yield prisma.envelopes.create({
            data: {
                title: title,
                budget: parseInt(budget),
            }
        });
        return res.status(201).send(newEnvelope);
    }
    catch (err) {
        return res.status(500).send({
            error: err.message,
        });
    }
});
exports.createEnvelope = createEnvelope;
//# sourceMappingURL=envelopes-prisma.js.map