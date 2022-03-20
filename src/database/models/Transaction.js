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
  balance: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  tags: {
    type: [Schema.Types.ObjectId],
    ref: "Tag",
  },
});
const Transaction = model("Transaction", TransactionSchema, "transactions");

module.exports = Transaction;
