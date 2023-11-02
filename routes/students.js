const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const { Mentor } = require("../models/mentor");
const { Student } = require("../models/student");
const auth = require("../middlewares/auth");

// GET: Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Fetch all students having specified mentorID
router.get("/mentor", auth, async (req, res) => {
  // Extract user id from request
  const user_id = req.user_id;

  // Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const students = await Student.find({ MentorID: new ObjectId(user_id) });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Fetch all students having unassigned mentorId
router.get("/unassigned", async (req, res) => {
  try {
    const students = await Student.find({ MentorID: null });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT: Update the grades of a student
router.put("/:id", auth, async (req, res) => {
  // Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  // Extract user id from request
  const user_id = req.user_id;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (user_id != student.MentorID) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const mentor = await Mentor.findById(user_id);
    if (mentor.Locked) {
      return res.status(400).send({ error: "Mentor profile is locked" });
    }

    student.Grades = req.body.Grades;
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST: Create a new student
router.post("/", async (req, res) => {
  const student = new Student({
    Name: req.body.Name,
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete a student by id
router.delete("/:id", async (req, res) => {
  // Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
