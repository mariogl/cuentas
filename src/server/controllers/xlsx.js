/* eslint-disable no-await-in-loop */
require("dotenv").config();
const debug = require("debug")("cuentas-api:server:controllers:xlsx");
const fs = require("fs");
const readXlsxFile = require("read-excel-file/node");
const chalk = require("chalk");
const xlsxSchema = require("../schemas/xlsxSchema");
const Transaction = require("../../database/models/Transaction");

const loadXLSX = async (req, res, next) => {
  const file = req.file.path;
  try {
    const { rows: transactionsXlsx } = await readXlsxFile(file, {
      schema: xlsxSchema,
    });
    debug(
      chalk.blue(
        `Extrayendo ${transactionsXlsx.length} transacciones del archivo importado`
      )
    );
    const transactions = transactionsXlsx.map(
      ({ date, description, quantity, balance }) => {
        const dateParts = date.split("/");
        const newTransaction = {
          date: new Date(dateParts[2], dateParts[1] - 1, dateParts[0], 4),
          description,
          quantity,
          balance,
        };

        return newTransaction;
      }
    );

    let transactionsImported = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const transaction of transactions) {
      const transactionExists = await Transaction.findOne({
        date: transaction.date,
        description: transaction.description,
        quantity: transaction.quantity,
        balance: transaction.balance,
      });
      if (!transactionExists) {
        await Transaction.create(transaction);
        transactionsImported += 1;
      } else {
        debug(chalk.red("Existe:"));
        debug(chalk.red(transactionExists));
      }
    }

    fs.unlinkSync(file);

    res.json({
      transactionsRead: transactionsXlsx.length,
      transactionsImported,
    });
  } catch (error) {
    debug(chalk.red(error.message));
    next(error);
  }
};

module.exports = {
  loadXLSX,
};
