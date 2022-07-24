const ApiError = require('../error/ApiError');

module.exports = (schema) => (req, res, next) => {
  const {error} = schema.validate(req.body);

  if (error) {
    return next(ApiError.clientError(error.message));
  }

  next();
};
