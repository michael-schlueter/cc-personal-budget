import express, { Express } from "express";
import dotenv from "dotenv";
const logger = require("morgan");

dotenv.config();

const envelopesRouter = require("./routes/envelopes");
const transactionsRouter = require("./routes/transactions");

const app: Express = express();
const port = process.env.PORT;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/envelopes", envelopesRouter);
app.use("/api/transactions", transactionsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
