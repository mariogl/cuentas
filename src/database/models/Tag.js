const { model, Schema } = require("mongoose");

const TagSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Tag = model("Tag", TagSchema, "tags");

module.exports = Tag;
