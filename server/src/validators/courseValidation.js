const Joi = require('joi');
const validate = require('./index');

const schema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  creationDate: Joi.string().required(),
  duration: Joi.number().required(),
  authors: Joi.array().items(Joi.string())
});

module.exports = validate(schema);

