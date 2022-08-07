const User = require('./User');
const Author = require('./Author');
const Course = require('./Course');
const { mongoose } = require("mongoose");

mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
  }
});

module.exports = {
  User,
  Author,
  Course
}
