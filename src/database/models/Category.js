const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  icon: String,
});

const Category = model("Category", CategorySchema, "categories");

module.exports = Category;
