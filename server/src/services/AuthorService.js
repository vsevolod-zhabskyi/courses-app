const AuthorJSONRepository = require('../repositories/json/AuthorJSONRepository');

class AuthorService {
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

  async create(author) {
    const candidate = await this.repository.find()
    return await this.repository.create(author);
  }

  async update(id, author) {
    return await this.repository.update(id, author);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

const authorRepository = new AuthorJSONRepository();
const authorService = new AuthorService(authorRepository);

module.exports = authorService;
