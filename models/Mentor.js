const mongoose = require('mongoose');
const Joi = require('joi');
const { studentSchema } = require('./Student');

const mentorSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
        unique: true
    },
    students: {
        type: [studentSchema],
    }
});

const Mentor = mongoose.model('Mentor', mentorSchema);

function validateMentor(mentor) {
    const schema = Joi.object({
        ID: Joi.number().required(),
        students: Joi.array().items(studentSchema)
    });
    return schema.validate(mentor);
}

module.exports = {
    Mentor,
    validateMentor
};
