import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const envelopesRouter = require("./routes/envelopes");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/envelopes", envelopesRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
