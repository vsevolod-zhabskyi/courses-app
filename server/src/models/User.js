const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
});

module.exports = model('User', schema);
