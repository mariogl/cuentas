const { model, Schema } = require("mongoose");

const TransactionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});
const Transaction = model("Transaction", TransactionSchema, "transactions");

module.exports = Transaction;
