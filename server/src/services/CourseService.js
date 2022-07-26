const { CourseMongoDBRepository } = require('../repositories/mongoDB');
const authorService = require('./AuthorService');
const ApiError = require("../error/ApiError");

class CourseService {
  repository;

  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getOneById(id) {
    return await this.repository.getOneById(id);
  }

  async findByAuthor(authorId) {
    return await this.repository.findByAuthor(authorId);
  }

  async create(course) {
    const authors = await authorService.getMultipleByIds(course.authors);
    if (authors.length !== course.authors.length) {
      throw ApiError.clientError('Some authors not found');
    }

    course.creationDate = new Date().toLocaleDateString('en-GB');

    return await this.repository.create(course);
  }

  async update(id, course) {
    const authors = await authorService.getMultipleByIds(course.authors);
    if (authors.length !== course.authors.length) {
      throw ApiError.clientError('Some authors not found');
    }

    return await this.repository.update(id, course);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

const courseRepository = new CourseMongoDBRepository();
const courseService = new CourseService(courseRepository);

module.exports = courseService;
