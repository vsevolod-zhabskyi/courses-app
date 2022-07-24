const CourseJSONRepository = require('../repositories/json/CourseJSONRepository');

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

  async create(course) {
    course.creationDate = new Date().toLocaleDateString('en-GB');

    return await this.repository.create(course);
  }

  async update(id, course) {
    return await this.repository.update(id, course);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

const courseRepository = new CourseJSONRepository();
const courseService = new CourseService(courseRepository);

module.exports = courseService;
