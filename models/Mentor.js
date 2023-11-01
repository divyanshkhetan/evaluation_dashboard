const mongoose = require('mongoose');
const Joi = require('joi');
const { studentSchema } = require('./student');

const mentorSchema = new mongoose.Schema({
    // _id is uniquely alloted to all records in MongoDB
    Name: {
        type: String,
        required: true
    },
    students: {
        type: [studentSchema],
    }
});

const Mentor = mongoose.model('Mentor', mentorSchema);

function validateMentor(mentor) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        students: Joi.array().items(studentSchema)
    });
    return schema.validate(mentor);
}

module.exports = {
    Mentor,
    validateMentor
};
