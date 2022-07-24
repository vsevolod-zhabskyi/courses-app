class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static clientError(message) {
    return new ApiError(400, message);
  }

  static serverError(message) {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
