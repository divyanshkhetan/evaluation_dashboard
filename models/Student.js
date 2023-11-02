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
    }
});

const Student = mongoose.model('Student', studentSchema);

function validateStudent(student) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        MentorID: Joi.object(),
        Grades: Joi.object({
            Ideation: Joi.number().allow(null),
            Execution: Joi.number().allow(null),
            Viva: Joi.number().allow(null)
        })
    });
    return schema.validate(student);
}

module.exports = {
    Student,
    validateStudent
};
