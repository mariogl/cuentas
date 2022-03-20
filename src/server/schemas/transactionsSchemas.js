const { Joi } = require("express-validation");
Joi.objectId = require("joi-objectid")(Joi);

const transactionSchema = {
  body: Joi.object({
    id: Joi.objectId().allow(""),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    category: Joi.objectId().required(),
    date: Joi.date().required(),
  }),
};

const addTagToTransactionSchema = {
  body: Joi.object({
    transactionId: Joi.objectId().required(),
    tagId: Joi.objectId().required(),
  }),
};

module.exports = {
  transactionSchema,
  addTagToTransactionSchema,
};
