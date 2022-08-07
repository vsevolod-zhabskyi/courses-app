const courseService = require('../services/CourseService');
const handleError = require('../error/handleError');
const ApiError = require("../error/ApiError");

class CourseController {
  static async getAll(req, res, next) {
    try {
      const courses = await courseService.getAll();

      return res.json({
        successful: true,
        result: courses
      });
    } catch (error) {
      handleError(error, next);
    }
  }

  static async getOneById(req, res, next) {
    try {
      const {id} = req.params;

      const course = await courseService.getOneById(id);

      return res.json({
        successful: true,
        result: course
      });
    } catch (error) {
      handleError(error, next);
    }
  }

  static async create(req, res, next) {
    try {
      const course = await courseService.create(req.body);

      return res.json({
        successful: true,
        result: course
      });
    } catch (error) {
      handleError(error, next);
    }
  }

  static async update(req, res, next) {
    try {
      const {id} = req.params;

      if (req.body.id && req.body.id !== id) {
        ApiError.clientError(`ID in parameters and ID in body doesn't match`)
      }

      const course = await courseService.update(id, req.body);

      return res.json({
        successful: true,
        result: course
      });
    } catch (error) {
      handleError(error, next);
    }
  }

  static async delete(req, res, next) {
    try {
      const {id} = req.params;

      const result = await courseService.delete(id) || false;

      res.json({
        successful: result
      });
    } catch (error) {
      handleError(error, next);
    }
  }
}

module.exports = CourseController;
