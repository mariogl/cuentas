const express = require("express");
const { validate } = require("express-validation");
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions");
const auth = require("../middlewares/auth");
const transactionSchema = require("../schemas/transactionsSchemas");

const transactionsRouter = express.Router();

transactionsRouter.get("/", auth, getTransactions);
transactionsRouter.post("/", validate(transactionSchema), createTransaction);
transactionsRouter.put("/", validate(transactionSchema), updateTransaction);
transactionsRouter.delete("/:id", deleteTransaction);

module.exports = transactionsRouter;
