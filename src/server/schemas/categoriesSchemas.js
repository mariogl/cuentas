const { Joi } = require("express-validation");

const categorySchema = {
  body: Joi.object({
    name: Joi.string().required(),
    icon: Joi.string(),
  }),
};

module.exports = {
  categorySchema,
};
