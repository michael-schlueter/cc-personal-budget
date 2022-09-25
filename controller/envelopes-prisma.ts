import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// @desc    Get all envelopes
// @route   GET /api/envelopes
export const getAllEnvelopes = async (req: Request, res: Response) => {
  try {
    const envelopes = await prisma.envelopes.findMany();
    if (!envelopes) {
      return res.status(404).send({
        message: "No envelopes found",
      });
    }

    return res.status(200).send(envelopes);
  } catch (err: any) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc  Get a specific envelope
// @route Get /api/envelopes/:id
export const getEnvelope = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const envelope = await prisma.envelopes.findUnique({
            where: {
                id: id
            }
        })

        if (!envelope) {
            return res.status(404).send({
                message: "Envelope Not Found",
            });
        }

        res.status(200).send(envelope);
    } catch (err: any) {
        return res.status(500).send({
            message: err.message,
        })
    }
}
