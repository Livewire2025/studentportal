// routes/students.js
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Registration API
router.post("/register", async (req, res) => {
  const { name, email, phone, college, clgCourse, course } = req.body;
  try {
    const existingStudent = await Student.findOne({
    $or: [{ email }, { phone }],
  });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newStudent = new Student({ name, email, phone, college, clgCourse, course });
    await newStudent.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Submit Test API
router.post("/submit", async (req, res) => {
  const { email, score } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    student.score = score;
    await student.save();
    res.json({ message: "Score updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
