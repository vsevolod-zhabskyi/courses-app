const uuidv4 = require('uuid').v4;

const JSONRepository = require('./JSONRepository');
const ApiError = require("../../error/ApiError");

class CourseJSONRepository extends JSONRepository {
  async getAll() {
    return await super.getAll('courses');
  }

  async writeAll(courses) {
    await super.writeAll('courses', courses);
  }

  async getOneById(id) {
    const courses = await this.getAll();

    const course = courses.find(course => course.id === id);

    if (!course) {
      throw ApiError.clientError(`No course with id ${id}`);
    }

    return course;
  }

  async create(course) {
    let courses = await this.getAll();

    course.id = uuidv4();

    courses.push(course);

    await this.writeAll(courses);

    return course;
  }

  async update(id, course) {
    const courses = await this.getAll();

    const courseIndex = courses.findIndex(course => course.id === id);

    if (courseIndex === -1) {
      throw ApiError.clientError(`No course with id ${id}`);
    }

    const newCourse = {
      ...courses[courseIndex],
      ...course
    };

    courses[courseIndex] = newCourse;

    await this.writeAll(courses);

    return newCourse;
  }

  async delete(id) {
    let courses = await this.getAll();

    if (!courses.find(course => course.id === id)) {
      throw ApiError.clientError(`No course with id ${id}`);
    }

    courses = courses.filter(course => course.id !== id);

    await this.writeAll(courses);

    return true;
  }
}

module.exports = CourseJSONRepository;
