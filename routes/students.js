const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId; 
const {Student} = require('../models/student');

// TODO: Check if the student is locked before allowing modification

// route to fetch all students
router.get('/', async (req, res) => {       // working
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// route to fetch all students having specified mentorID
router.get('/mentor/:mentorID', async (req, res) => {           // working
    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.mentorID)) {          // working
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        const students = await Student.find({ MentorID: new ObjectId(req.params.mentorID) });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// route to fetch all students having unassigned mentorid
router.get('/unassigned', async (req, res) => {           // working
    try {
        const students = await Student.find({ MentorID: null });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// route to create a new student
router.post('/', async (req, res) => {      // working
    const student = new Student({
        Name: req.body.Name
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// route to update the grades of a student
router.put('/:id', async (req, res) => {             // working
    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {          // working
        return res.status(400).json({ message: 'Invalid ID' });
    }

    // TODO: add check that only the assigned mentor can update the grades

    try {
        const student = await Student.findById(req.params.id);
        if (!student) {             // working
            return res.status(404).json({ message: 'Student not found' });
        }
        student.Grades = req.body.Grades;
        const updatedStudent = await student.save();        // working
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// route to delete a student by id
router.delete('/:id', async (req, res) => {        // working
    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;