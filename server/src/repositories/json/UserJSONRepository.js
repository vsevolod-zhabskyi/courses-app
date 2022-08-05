const uuidv4 = require('uuid').v4;
const bcrypt = require('bcrypt');

const JSONRepository = require('./JSONRepository');
const ApiError = require("../../error/ApiError");

class UserJSONRepository extends JSONRepository {
  async getAll() {
    return await super.getAll('users');
  }

  async writeAll(users) {
    await super.writeAll('users', users);
  }

  async create(user) {
    let users = await this.getAll();
    user.id = uuidv4();

    users.push(user);

    await this.writeAll(users);

    return user;
  }

  async find(options) {
    const users = await this.getAll();

    const user = users.find(user => {
      for (let prop in options) {
        if (user[prop] !== options[prop]) {
          return false;
        }
      }
      return true;
    });

    return user;
  }

  async getOneById(id) {
    const users = await this.getAll();

    const user = users.find(user => user.id === id);

    if (!user) {
      throw ApiError.clientError(`No user with id ${id}`);
    }

    return user;
  }

  async update(id, user) {
    const users = await this.getAll();

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      throw ApiError.clientError(`No user with id ${id}`);
    }

    const newUser = {
      ...users[userIndex],
      ...user
    };

    users[userIndex] = newUser;

    await this.writeAll(users);

    return newUser;
  }

  async delete(id) {
    let users = await this.getAll();

    if (!users.find(user => user.id === id)) {
      throw ApiError.clientError(`No user with id ${id}`);
    }

    users = users.filter(user => user.id !== id);

    await this.writeAll(users);

    return true;
  }
}

module.exports = UserJSONRepository;
