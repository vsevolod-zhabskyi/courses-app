const Joi = require('joi');
const validate = require('./index');

const schema = Joi.object({
  name: Joi.string().required()
});

module.exports = validate(schema);
