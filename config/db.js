const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'));
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}