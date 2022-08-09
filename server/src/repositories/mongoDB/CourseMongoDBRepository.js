const { Course } = require("../../models");

class CourseMongoDBRepository {
  async getAll() {
    return await Course.find();
  }

  async getOneById(id) {
    return await Course.findById(id);
  }

  async findByAuthor(authorId) {
    return await Course.find({authors: authorId });
  }

  async create(course) {
    return await Course.create(course);
  }

  async update(id, course) {
    return await Course.findByIdAndUpdate(id, course, { new: true });
  }

  async delete(id) {
    await Course.findByIdAndDelete(id);

    return true;
  }
}

module.exports = CourseMongoDBRepository;
