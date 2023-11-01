const Mentor = require('../models/mentor');

function auth(req, res, next) {
    const mentorId = req.params.id;

    Mentor.findById(mentorId, (error, mentor) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!mentor) {
            return res.status(401).json({ message: 'Invalid mentor ID' });
        }

        req.mentor = mentor;
        next();
    });
}

module.exports = auth;
