interface Envelope {
  id: number;
  title: string;
  budget: number;
}

export const createId = (envelopes: Envelope[]) => {
  const newId = envelopes.length + 1;

  if (newId === NaN || newId === undefined || newId < 0) {
    console.log("Invalid ID");
    return;
  }

  return newId;
};

export const findById = (envelopes: Envelope[], id: string) => {
  const envelopeId = parseInt(id);

  if (envelopeId === NaN || envelopeId === undefined || envelopeId < 0) {
    console.log("Invalid ID");
    return;
  }

  const retrievedEnvelope = envelopes.find(
    (envelope) => envelope.id === envelopeId
  );
  if (!retrievedEnvelope) {
    console.log("ID not found");
    return;
  }

  return retrievedEnvelope;
};

export const getIndex = (envelopes: Envelope[], id: string) => {
  const envelopeId = parseInt(id);

  if (envelopeId === NaN || envelopeId === undefined || envelopeId < 0) {
    console.log("Invalid ID");
    return;
  }

  const retrievedIdx = envelopes.findIndex(
    (envelope) => envelope.id === envelopeId
  );

  if (!retrievedIdx) {
    console.log("Index not found");
    return;
  }

  return retrievedIdx;
};
