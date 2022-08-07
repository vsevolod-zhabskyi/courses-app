const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  creationDate: {type: Date, required: true},
  duration: {type: Number, required: true},
  authors: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
    required: true
  },
});

module.exports = model('Course', schema);
