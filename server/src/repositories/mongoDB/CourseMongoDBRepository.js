const { Course } = require("../../models");

class CourseMongoDBRepository {
  async getAll() {
    return await Course.find();
  }

  async getOneById(id) {
    return await Course.findById(id);
  }

  async create(course) {
    return await Course.create(course);
  }

  async update(id, course) {
    return await Course.findByIdAndUpdate(id, course, { new: true });
  }

  async delete(id) {
    return await Course.findByIdAndDelete(id);
  }
}

module.exports = CourseMongoDBRepository;
