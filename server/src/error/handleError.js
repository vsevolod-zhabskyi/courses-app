const ApiError = require("../error/ApiError");

module.exports = (error, next) => {
  if (error instanceof ApiError) {
    next(error);
  } else {
    next(ApiError.serverError(error.message));
  }
}
