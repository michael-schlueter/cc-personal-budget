import express from "express";

import {
  getAllEnvelopes,
  getEnvelope,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
  createTransaction,
  getEnvelopeTransactions,
} from "../controller/envelopes-prisma";

const envelopesRouter = express.Router();

/**
 * @swagger
 * /api/envelopes:
 *    get:
 *      summary: Get all envelopes
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      responses:
 *        "200":
 *          description: Returns a list of all envelopes
 *        "404":
 *          description: No envelopes found
 *        "500":
 *          description: Internal server error
 */
envelopesRouter.get("/", getAllEnvelopes);

/**
 * @swagger
 * /api/envelopes/{id}:
 *    get:
 *      summary: Get an envelope by ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: uuid
 *          required: true
 *          example: f55bda71-744e-4a4c-b38e-8488d9953165
 *      responses:
 *        "200":
 *          description: Returns an envelope along with its data
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
envelopesRouter.get("/:id", getEnvelope);

/**
 * @swagger
 * /api/envelopes:
 *    post:
 *      summary: Create a new envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Insurances
 *                budget: 1000
 *      responses:
 *        "201":
 *          description: Returns created envelope
 *        "400":
 *          description: Title and/or budget not included
 *        "500":
 *          description: Internal server error
 */
envelopesRouter.post("/", createEnvelope);

/**
 * @swagger
 * /api/envelopes/{id}:
 *    put:
 *      summary: Updates an existing envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope ID
 *          type: uuid
 *          required: true
 *          example: f55bda71-744e-4a4c-b38e-8488d9953165
 *      requestBody:
 *        description: Data for updated envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: rent
 *                budget: 400
 *        responses:
 *          "200":
 *            descriptions: Returns updated envelope
 *          "400":
 *            description: Title and/or budget not included
 *          "404":
 *            description: Envelope not found
 *          "500":
 *            description: Internal server error
 */
envelopesRouter.put("/:id", updateEnvelope);

/**
 * @swagger
 * /api/envelopes/{id}:
 *    delete:
 *      summary: Deletes an individual envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Envelope ID to delete
 *          type: uuid
 *          required: true
 *          example: e7fbc048-edc6-4281-a492-0bd884361a43
 *      responses:
 *        "204":
 *          description: Envelope deleted
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
envelopesRouter.delete("/:id", deleteEnvelope);

/**
 * @swagger
 * /api/envelopes/{id}/transactions:
 *    post:
 *      summary: Creates a new envelope transaction
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: uuid
 *          required: true
 *          example: f55bda71-744e-4a4c-b38e-8488d9953165
 *      requestBody:
 *        description: Data for new envelope transaction
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                amount:
 *                  type: integer
 *              example:
 *                title: Netflix
 *                amount: 10
 *        responses:
 *          "201":
 *            description: Returns created envelope transaction
 *          "400":
 *            description: Title and/or amount not provided
 *          "404":
 *            description: Envelope not found
 *          "500":
 *            description: Internal server error
 */
envelopesRouter.post("/:id/transactions", createTransaction);

/**
 * @swagger
 * /api/v1/envelopes/{id}/transactions:
 *    get:
 *      summary: Get envelope transactions by an envelope ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: uuid
 *          required: true
 *          example: f55bda71-744e-4a4c-b38e-8488d9953165
 *      responses:
 *        "200":
 *          description: Returns a an envelope along with its data
 *        "404":
 *          description: Transactions for the specific envelope not found
 *        "500":
 *          description: Internal server error
 */
envelopesRouter.get("/:id/transactions", getEnvelopeTransactions);

module.exports = envelopesRouter;
