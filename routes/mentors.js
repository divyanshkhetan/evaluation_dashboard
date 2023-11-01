const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Mentor} = require('../models/mentor');
const {Student} = require('../models/student');

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
router.put('/:mentorId/students/:studentId', async (req, res) => {

    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.mentorId)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.studentId)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        const mentor = await Mentor.findById(req.params.mentorId);
        const student = await Student.findById(req.params.studentId);

        if (!mentor || !student) {
            return res.status(404).send({ error: 'Mentor or student not found' });
        }

        if (mentor.students.length >= 4) {
            return res.status(400).send({ error: 'Mentor already has 4 students' });
        }

        if (mentor.students.includes(student._id)) {
            return res.status(400).send({ error: 'Student is already assigned to this mentor' });
        }

        if (mentor.students.length < 4) {
            mentor.students.push(student);
            student.mentor = mentor._id;
            await mentor.save();
            await student.save();
            return res.status(201).send({ message: 'Student assigned to mentor successfully' });
        }

        return res.status(400).send({ error: 'Mentor already has 4 students' });
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


module.exports = router;
