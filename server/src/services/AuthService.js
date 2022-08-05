const jwt = require('jsonwebtoken');

const UserJSONRepository = require('../repositories/json/UserJSONRepository');
const bcrypt = require("bcrypt");
const ApiError = require("../error/ApiError");

const generateJwt = ({ id, email, role }) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  );
}

class AuthService {
  repository;

  constructor(repository) {
    this.repository = repository;
  }

  async register(user) {
    const candidate = await this.repository.find({email: user.email});
    if (candidate) {
      throw ApiError.clientError('Email is already used');
    }

    user.role = 'user';
    user.password = await bcrypt.hash(user.password, 5);

    const newUser = await this.repository.create(user);

    const token = generateJwt({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    });

    return {
      newUser,
      token: 'Bearer ' + token
    }
  }

  async login({email, password}) {
    const user = await this.repository.find({email});
    if (!user) {
      throw ApiError.clientError(`User not found`);
    }

    let comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw ApiError.clientError(`Wrong password!`);
    }

    delete user.password;

    const token = generateJwt({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return {
      user,
      token: 'Bearer ' + token
    }
  }

  async check(token) {
    const {id} = jwt.verify(token, process.env.SECRET_KEY);

    return await this.repository.getOneById(id);
  }
}

const userRepository = new UserJSONRepository();
const authService = new AuthService(userRepository);

module.exports = authService;
