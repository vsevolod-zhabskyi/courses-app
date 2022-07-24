const authorService = require('../services/AuthorService');
const handleError = require('../error/handleError');

class AuthorController {
  static async getAll(req, res, next) {
    try {
      const authors = await authorService.getAll();

      return res.json({
        successful: true,
        result: authors
      });
    } catch (error) {
      handleError(error, next);
    }
  }

  static async getOneById(req, res, next) {
    try {
      const {id} = req.params;

      const author = await authorService.getOneById(id);

      return res.json({
        successful: true,
        result: author
      });
    } catch (error) {
      handleError(error, next);
    }
  }

  static async create(req, res, next) {
    try {
      const author = await authorService.create(req.body);

      return res.json({
        successful: true,
        result: author
      });
    } catch (error) {
      handleError(error, next);
    }
  }

  static async update(req, res, next) {
    try {
      const {id} = req.params;

      const author = await authorService.update(id, req.body);

      return res.json({
        successful: true,
        result: author
      });
    } catch (error) {
      handleError(error, next);
    }
  }

  static async delete(req, res, next) {
    try {
      const {id} = req.params;

      const result = await authorService.delete(id) || false;

      res.json({
        successful: result
      });
    } catch (error) {
      handleError(error, next);
    }
  }
}

module.exports = AuthorController;
