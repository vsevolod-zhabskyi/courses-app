const { Author } = require("../../models");

class AuthorMongoDBRepository {
  async getAll() {
    return await Author.find();
  }

  async getOneById(id) {
    return await Author.findById(id);
  }

  async getMultipleByIds(ids) {
    return await Author.find({ _id: { $in: ids }});
  }

  async create(author) {
    return await Author.create(author);
  }

  async update(id, author) {
    return await Author.findByIdAndUpdate(id, author, { new: true });
  }

  async delete(id) {
    await Author.findByIdAndDelete(id);

    return true;
  }
}

module.exports = AuthorMongoDBRepository;
