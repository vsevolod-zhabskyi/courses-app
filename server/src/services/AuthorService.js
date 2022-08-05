const AuthorJSONRepository = require('../repositories/json/AuthorJSONRepository');
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

  async create(author) {
    delete author.id;

    return await this.repository.create(author);
  }

  async update(id, author) {
    delete author.id;

    return await this.repository.update(id, author);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

const authorRepository = new AuthorJSONRepository();
const authorService = new AuthorService(authorRepository);

module.exports = authorService;
