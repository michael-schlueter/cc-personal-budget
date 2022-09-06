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
const modelEnvelopes = require("../model/envelopes");
const { createNewId } = require("../utils/helpers");
// @desc    Get all envelopes
// @route   GET /api/envelopes
const getAllEnvelopes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Mock retrieval via database
        const envelopes = yield modelEnvelopes;
        res.status(200).send(envelopes);
        // ???????????? NEED TO CALL NEXT FUNCTION ????????????
    }
    catch (err) {
        res.status(400).send(err);
    }
});
// @desc  Create a new envelope
// @route POST /api/envelopes
const addEnvelope = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, budget } = req.body;
        const envelopes = yield modelEnvelopes;
        const newId = createNewId();
        console.log(newId);
        const newEnvelope = {
            id: newId,
            title,
            budget,
        };
        envelopes.push(newEnvelope);
        res.status(201).send(newEnvelope);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
module.exports = {
    getAllEnvelopes,
    addEnvelope,
};
