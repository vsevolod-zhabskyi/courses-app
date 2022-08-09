const ApiError = require('../error/ApiError');
const jwt = require("jsonwebtoken");
const userRole = require('../constants/userRole');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(ApiError.clientError('User is not logged in'));
    }

    const {role} = jwt.verify(token, process.env.SECRET_KEY);

    if (role === userRole.ADMIN) {
      return next();
    }
    return next(ApiError.clientError('User is not authorized to perform this action'));
  } catch (e) {
    return next(ApiError.serverError('Server error'));
  }
}
