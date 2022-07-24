const AuthService = require('../services/AuthService');
const handleError = require("../error/handleError");

class AuthController {
  static async login (req, res, next) {
    try {
      const {token, user} = await AuthService.login(req.body);

      res.json({
        successful: true,
        result: token,
        user
      });
    } catch (error) {
      handleError(error, next);
    }
  }

  static async register(req, res, next) {
    try {
      console.log (req.body)
      const {token, user} = await AuthService.register(req.body);

      res.json({
        successful: true,
        result: token,
        user
      });
    } catch (error) {
      handleError(error, next);
    }
  }

  static async check(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      const user = await AuthService.check(token);

      res.json({
        successful: true,
        result: user
      });
    } catch (error) {
      handleError(error, next);
    }
  }
}

module.exports = AuthController;
