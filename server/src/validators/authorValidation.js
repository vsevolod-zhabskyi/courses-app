const Joi = require('joi');
const validate = require('./index');

const schema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required()
});

module.exports = validate(schema);
