const fs = require("node:fs/promises");
const ApiError = require('../../error/ApiError');

class JSONRepository {
  async getAll(entityName) {
    try {
      const data = await fs.readFile(`${process.cwd()}/src/db/${entityName}.json`, 'utf-8');

      return JSON.parse(data);
    } catch (error) {
      throw ApiError.serverError(`${error.code}: Cannot read ${error.path}`);
    }
  }

  async writeAll(entityName, data) {
    try {
      await fs.writeFile(
        `${process.cwd()}/src/db/${entityName}.json`,
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      throw ApiError.serverError(`${error.code}: Cannot write to ${error.path}`);
    }
  }
}

module.exports = JSONRepository;
