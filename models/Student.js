const mongoose = require('mongoose');
const Joi = require('joi');

const studentSchema = new mongoose.Schema({
    // _id is uniquely allotted to all records in mongoDB
    Name: {
        type: String,
        required: true
    },
    MentorID: {
        type: Object,
        default: null
    },
    Grades: {
        Ideation: {
            type: Number,
            default: null
        },
        Execution: {
            type: Number,
            default: null
        },
        Viva: {
            type: Number,
            default: null
        },
    },
    Email: {
        type: String,
        required: true,
        unique: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student
