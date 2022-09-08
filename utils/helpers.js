"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = exports.findById = exports.createId = void 0;
const createId = (envelopes) => {
    const newId = envelopes.length + 1;
    if (newId === NaN || newId === undefined || newId < 0) {
        console.log("Invalid ID");
        return;
    }
    return newId;
};
exports.createId = createId;
const findById = (envelopes, id) => {
    const envelopeId = parseInt(id);
    if (envelopeId === NaN || envelopeId === undefined || envelopeId < 0) {
        console.log("Invalid ID");
        return;
    }
    const retrievedEnvelope = envelopes.find((envelope) => envelope.id === envelopeId);
    if (!retrievedEnvelope) {
        console.log("ID not found");
        return;
    }
    return retrievedEnvelope;
};
exports.findById = findById;
const getIndex = (envelopes, id) => {
    const envelopeId = parseInt(id);
    if (envelopeId === NaN || envelopeId === undefined || envelopeId < 0) {
        console.log("Invalid ID");
        return;
    }
    const retrievedIdx = envelopes.findIndex((envelope) => envelope.id === envelopeId);
    if (!retrievedIdx) {
        console.log("Index not found");
        return;
    }
    return retrievedIdx;
};
exports.getIndex = getIndex;
