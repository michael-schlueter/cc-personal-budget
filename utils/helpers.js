"use strict";
const createNewId = (envelopes) => {
    const newId = envelopes.length + 1;
    if (newId === NaN || newId < 0 || newId === undefined) {
        console.log("Invalid ID");
        return;
    }
    return newId;
};
module.exports = {
    createNewId,
};
