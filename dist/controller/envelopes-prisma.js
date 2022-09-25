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
exports.getAllEnvelopes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// @desc    Get all envelopes
// @route   GET /api/envelopes
const getAllEnvelopes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const envelopes = yield prisma.envelopes.findMany();
        if (!envelopes) {
            return res.status(404).send({
                message: "No envelopes found"
            });
        }
        return res.status(200).send(envelopes);
    }
    catch (err) {
        return res.status(500).send({
            error: err.message
        });
    }
});
exports.getAllEnvelopes = getAllEnvelopes;
//# sourceMappingURL=envelopes-prisma.js.map