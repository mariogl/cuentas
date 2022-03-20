const { Joi } = require("express-validation");
Joi.objectId = require("joi-objectid")(Joi);

const tagSchema = {
  body: Joi.object({
    id: Joi.objectId(),
    name: Joi.string().required(),
  }),
};

module.exports = {
  tagSchema,
};
