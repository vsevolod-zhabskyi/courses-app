const { AuthorMongoDBRepository } = require('../repositories/mongoDB');
const courseService = require('../services/courseService');
const ApiError = require("../error/ApiError");

class AuthorService {
  repository;

  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getOneById(id) {
    const author =  await this.repository.getOneById(id);
    if (!author) {
      throw ApiError.clientError(`No author with id ${id}`)
    }

    return author;
  }

  async getMultipleByIds(ids) {
    return await this.repository.getMultipleByIds(ids);
  }

  async create(author) {
    return await this.repository.create(author);
  }

  async update(id, author) {
    return await this.repository.update(id, author);
  }

  async delete(id) {
    const courses = await courseService.findByAuthor(id);
    if (courses.length) {
      throw ApiError.clientError('Cannot delete author with courses')
    }

    return await this.repository.delete(id);
  }
}

const authorRepository = new AuthorMongoDBRepository();
const authorService = new AuthorService(authorRepository);

module.exports = authorService;
