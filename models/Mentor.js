const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    // _id is uniquely alloted to all records in MongoDB
    Name: {
        type: String,
        required: true
    },
    students: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
        deafult: []
    },
    Locked: {
        type: Boolean,
        default: false
    }
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor
