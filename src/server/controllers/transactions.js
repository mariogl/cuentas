require("dotenv").config();
const debug = require("debug")("cuentas-api:server:controllers:transactions");
const chalk = require("chalk");
const Transaction = require("../../database/models/Transaction");

const getTransactions = async (req, res) => {
  const { search } = req.params;

  try {
    const searchObject = search
      ? {
          description: {
            $regex: search,
            $options: "i",
          },
        }
      : {};
    const transactions = await Transaction.find(searchObject).populate(
      "category"
    );
    res.json({
      transactions,
    });
  } catch (error) {
    debug(chalk.red(error.message));
  }
};

const createTransaction = async (req, res, next) => {
  const transaction = req.body;
  try {
    const createdTransaction = await Transaction.create(transaction);
    res.status(201).json({ transaction: createdTransaction });
  } catch (error) {
    debug(chalk.red(error.message));
    error.statusCode = 400;
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  const transaction = req.body;
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transaction.id,
      transaction
    );
    res.json({ transaction: updatedTransaction });
  } catch (error) {
    debug(chalk.red(error.message));
    error.statusCode = 400;
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Transaction.findByIdAndDelete(id);
    res.json({});
  } catch (error) {
    debug(chalk.red(error.message));
    error.statusCode = 400;
    next(error);
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
