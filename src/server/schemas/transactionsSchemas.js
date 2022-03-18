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

module.exports = transactionSchema;
