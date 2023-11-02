const mongoose = require('mongoose');
const Joi = require('joi');

const mentorSchema = new mongoose.Schema({
    // _id is uniquely alloted to all records in MongoDB
    Name: {
        type: String,
        required: true
    },
    students: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
        deafult: []
    }
});

const Mentor = mongoose.model('Mentor', mentorSchema);

function validateMentor(mentor) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        students: Joi.array()
    });
    return schema.validate(mentor);
}

module.exports = {
    Mentor,
    validateMentor
};
