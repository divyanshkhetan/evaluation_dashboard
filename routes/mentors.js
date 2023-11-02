const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Mentor} = require('../models/mentor');
const {Student} = require('../models/student');

// TODO: check if the student is locked before allowing modification

// GET route to fetch all the mentors
router.get('/', async (req, res) => {           // working
    try {
        const mentors = await Mentor.find({});
        res.send(mentors);
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST route to create a new mentor
router.post('/', async (req, res) => {          // working
    try {
        const mentor = new Mentor({
            Name: req.body.Name
        });
        await mentor.save();
        res.status(201).send(mentor);
    } catch (error) {
        res.status(400).send(error);
    }
});

// PUT route to assign a student to a mentor
router.put('/:mentorId/students/:studentId', async (req, res) => {      // working

    // Check if ID is a valid ObjectId      // working
    if (!mongoose.Types.ObjectId.isValid(req.params.mentorId)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    // Check if ID is a valid ObjectId      // working
    if (!mongoose.Types.ObjectId.isValid(req.params.studentId)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        const mentor = await Mentor.findById(req.params.mentorId).populate('students');
        const student = await Student.findById(req.params.studentId);

        console.log(mentor);
        console.log(student);

        if (!mentor || !student) {          // working
            return res.status(404).send({ error: 'Mentor or student not found' });
        }

        if (mentor.students.length >= 4) {
            return res.status(400).send({ error: 'Mentor already has 4 students' });
        }


        // Check if student is already assigned to a mentor
        if (student.MentorID) {             // working
            return res.status(400).send({ error: 'Student is already assigned to a mentor' });
        }

        if (mentor.students.length < 4) {       // working
            mentor.students.push(student);
            student.MentorID = mentor._id;
            await mentor.save();
            await student.save();
            return res.status(201).send({ message: 'Student assigned to mentor successfully' });
        }

        return res.status(400).send({ error: 'Mentor already has 4 students' });        // working
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE route to delete a mentor based on their ID
router.delete('/:id', async (req, res) => {        // working
    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        const deletedMentor = await Mentor.findByIdAndDelete(req.params.id);
        if (!deletedMentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json({ message: 'Mentor deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// PUT route to lock the profiles of all the students under a mentor
router.put('/:mentorId/lockstudents', async (req, res) => {     // working
    try {
        // Check if mentor ID is valid
        if (!mongoose.Types.ObjectId.isValid(req.params.mentorId)) {
            return res.status(400).json({ message: 'Invalid ID' });         // working
        }

        // Find the mentor by ID and populate the students array
        const mentor = await Mentor.findById(req.params.mentorId).populate('students');

        // Check if the number of students lies between 3 and 4
        if (mentor.students.length < 3 || mentor.students.length > 4) {     // working
            return res.status(400).json({ message: 'Cannot lock profiles as number of students is not between 3 and 4' });
        }

        // Check if any of the students have any grades set to null

        const studentsWithNullGrades = mentor.students.filter(student => 
            // student && student.Grades && typeof student.Grades === 'object' &&
            Object.values(student.Grades).some(grade => grade === null));

        if (studentsWithNullGrades.length > 0) {    // working
            // studentsWithNullGrades.forEach(stud => console.log(stud));
            return res.status(400).json({ message: 'Cannot lock profiles as some students have null grades' });
        }

        // Set the locked property of all the students to true
        const studentPromises = mentor.students.map(student => {
            return Student.findByIdAndUpdate(student._id, { Locked: true });
        });

        Promise.all(studentPromises).then(updatedStudents => {      // working
            res.json({ message: 'Profiles of all students under the mentor have been locked' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;
