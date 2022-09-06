"use strict";
const modelEnvelopes = require("../model/envelopes");
const createNewId = () => {
    const newId = modelEnvelopes.length + 1;
    if (newId === NaN || newId < 0 || newId === undefined) {
        console.log("Invalid ID");
    }
    return newId;
};
module.exports = {
    createNewId,
};
