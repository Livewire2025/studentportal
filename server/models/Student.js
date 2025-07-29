const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness
  },
  phone: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness
  },
  college: String,
  clgCourse: String,
  careerStatus: String
});

module.exports = mongoose.model("Student", studentSchema);
