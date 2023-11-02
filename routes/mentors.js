const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Mentor } = require("../models/mentor");
const { Student } = require("../models/student");
const auth = require("../middlewares/auth");
const nodemailer = require("nodemailer");

// GET: Fetch all the mentors
router.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find({});
    res.send(mentors);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST: Assign students to a mentor
router.post("/assign", auth, async (req, res) => {
  // Extract user id from request
  const user_id = req.user_id;

  // Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const mentor = await Mentor.findById(user_id);
    if (mentor.Locked) {
      return res.status(400).send({ error: "Mentor profile is locked" });
    }

    const temp = req.body.students;
    let students = [];
    for (let i = 0; i < temp.length; i++) {
      const student = await Student.findById(temp[i]);
      if (!student) {
        return res.status(404).send({ error: `Student ${temp[i]} not found` });
      }
      students.push(student);
    }

    if (!mentor) {
      return res.status(404).send({ error: "Mentor not found" });
    }

    if (students.length < 3) {
      return res
        .status(400)
        .send({ error: "Mentor can have a minimum of 3 students" });
    }

    if (students.length > 4) {
      return res
        .status(400)
        .send({ error: "Mentor can have a maximum of 4 students" });
    }

    for (let i = 0; i < mentor.students.length; i++) {
      const stud = await Student.findById(mentor.students[i]);
      stud.MentorID = null;
      await stud.save();
    }

    // Check if student is already assigned to a mentor
    for (let i = 0; i < students.length; i++) {
      const stud = await Student.findById(students[i]._id);
      if (stud.MentorID) {
        return res
          .status(400)
          .send({
            error: `Student ${stud.Name} is already assigned to a mentor`,
          });
      }
    }

    for (let i = 0; i < students.length; i++) {
      const stud = await Student.findById(students[i]._id);
      stud.MentorID = mentor._id;
      await stud.save();
    }

    const allStuds = await Student.find();
    for (let i = 0; i < allStuds.length; i++) {
      if (allStuds[i].MentorID == null) {
        allStuds[i].Grades = {
          Ideation: null,
          Execution: null,
          Viva: null,
        };
        allStuds[i].save();
      }
    }

    mentor.students = students;
    await mentor.save();
    res
      .status(201)
      .send({ message: "Students assigned to mentor successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

// PUT: Lock the profiles of all the students under a mentor
router.put("/lock", auth, async (req, res) => {
  // Extract user id from request
  const user_id = req.user_id;

  try {
    // Check if mentor ID is valid
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // Find the mentor by ID and populate the students array
    const mentor = await Mentor.findById(user_id).populate("students");

    // Check if the number of students lies between 3 and 4
    if (mentor.students.length < 3 || mentor.students.length > 4) {
      return res
        .status(400)
        .json({
          message:
            "Cannot lock profiles as number of students is not between 3 and 4",
        });
    }

    // Check if any of the students have any grades set to null
    const studentsWithNullGrades = mentor.students.filter((student) =>
      // student && student.Grades && typeof student.Grades === 'object' &&
      Object.values(student.Grades).some((grade) => grade === null)
    );

    if (studentsWithNullGrades.length > 0) {
      // working
      // studentsWithNullGrades.forEach(stud => console.log(stud));
      return res
        .status(400)
        .json({
          message: "Cannot lock profiles as some students have null grades",
        });
    }

    // Set the locked property of mentor to true
    mentor.Locked = true;
    await mentor.save();

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3481768d0f7474",
        pass: "637856c2b79e33"
      }
    });

    for(let i=0; i<mentor.students.length; i++) {
      const info = await transport.sendMail({
        from: `"${mentor.Name}" <academic@example.com>`, // sender address
        to: mentor.students[i].Email, // list of receivers
        subject: "Evaluation", // Subject line
        text: `Marks: ${mentor.students[i].Grades.Execution + mentor.students[i].Grades.Ideation + mentor.students[i].Grades.Viva}/30`, // plain text body
        html: `<b>Marks: ${mentor.students[i].Grades.Execution + mentor.students[i].Grades.Ideation + mentor.students[i].Grades.Viva}/30</b>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
    }

    res.json({
      message: "Profiles of all students under the mentor have been locked",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// POST: Create a new mentor
router.post("/", async (req, res) => {
  try {
    const mentor = new Mentor({
      Name: req.body.Name,
    });
    await mentor.save();
    res.status(201).send(mentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE: Delete a mentor based on their ID
router.delete("/:id", async (req, res) => {
  // Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const deletedMentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!deletedMentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.json({ message: "Mentor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
