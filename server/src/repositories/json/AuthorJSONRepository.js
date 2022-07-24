const uuidv4 = require('uuid').v4;

const JSONRepository = require('./JSONRepository');
const ApiError = require("../../error/ApiError");

class AuthorJSONRepository extends JSONRepository {
  async getAll() {
    return await super.getAll('authors');
  }

  async writeAll(authors) {
    await super.writeAll('authors', authors);
  }

  async getOneById(id) {
    const authors = await this.getAll();

    const author = authors.find(author => author.id === id);

    if (!author) {
      throw ApiError.clientError(`No author with id ${id}`);
    }

    return author;
  }

  async create(author) {
    let authors = await this.getAll();

    author.id = uuidv4();

    authors.push(author);

    await this.writeAll(authors);

    return author;
  }

  async update(id, author) {
    const authors = await this.getAll();

    const authorIndex = authors.findIndex(author => author.id === id);

    if (authorIndex === -1) {
      throw ApiError.clientError(`No author with id ${id}`);
    }

    const newAuthor = {
      ...authors[authorIndex],
      ...author
    };

    authors[authorIndex] = newAuthor;

    await this.writeAll(authors);

    return newAuthor;
  }

  async delete(id) {
    let authors = await this.getAll();

    if (!authors.find(author => author.id === id)) {
      throw ApiError.clientError(`No author with id ${id}`);
    }

    authors = authors.filter(author => author.id !== id);

    await this.writeAll(authors);

    return true;
  }
}

module.exports = AuthorJSONRepository;
