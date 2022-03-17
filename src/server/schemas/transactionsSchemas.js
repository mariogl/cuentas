const { Joi } = require("express-validation");

const transactionSchema = {
  body: Joi.object({
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    date: Joi.date().required(),
  }),
};

module.exports = transactionSchema;
