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

// POST: Update the grades of students
router.post("/update", auth, async (req, res) => {
  // Extract user id from request
  const user_id = req.user_id;

  try {
    const { students } = req.body;

    for (let i = 0; i < students.length; i++) {
      const student = await Student.findById(students[i]._id);
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

      student.Grades.Execution = students[i].Grades.Execution === "-1" || students[i].Grades.Execution === null ? null : parseInt(students[i].Grades.Execution);
      student.Grades.Ideation = students[i].Grades.Ideation === "-1" || students[i].Grades.Ideation === null ? null : parseInt(students[i].Grades.Ideation);
      student.Grades.Viva = students[i].Grades.Viva === "-1" || students[i].Grades.Viva === null ? null : parseInt(students[i].Grades.Viva);
      await student.save();
    }
    res.json("Updated");
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
