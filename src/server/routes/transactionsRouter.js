const express = require("express");
const { validate } = require("express-validation");
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  deleteAllTransactions,
  addTagToTransaction,
} = require("../controllers/transactions");
const {
  transactionSchema,
  addTagToTransactionSchema,
} = require("../schemas/transactionsSchemas");

const transactionsRouter = express.Router();

transactionsRouter.get("/", getTransactions);
transactionsRouter.post("/", validate(transactionSchema), createTransaction);
transactionsRouter.put("/", validate(transactionSchema), updateTransaction);
transactionsRouter.post(
  "/tag",
  validate(addTagToTransactionSchema),
  addTagToTransaction
);
transactionsRouter.delete("/all", deleteAllTransactions);
transactionsRouter.delete("/:id", deleteTransaction);

module.exports = transactionsRouter;
