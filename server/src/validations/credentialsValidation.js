const Joi = require('joi');
const validate = require('./index');

const schema = Joi.object({
  email: Joi.string().email({minDomainSegments: 2}).required(),
  password: Joi.string().required()
});

module.exports = validate(schema);

