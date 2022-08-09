const { User } = require("../../models")

class UserMongoDBRepository {
  async create(user) {
    return await User.create(user);
  }

  async getOneById(id) {
    return await User.findById(id);
  }

  async find(options) {
    return await User.findOne(options);
  }
}

module.exports = UserMongoDBRepository;
