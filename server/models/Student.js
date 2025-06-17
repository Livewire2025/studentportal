const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  college: String,
  clgCourse: String,
  course: String,
  careerStatus: String,
  score: Number
});

module.exports = mongoose.model("Student", studentSchema);
