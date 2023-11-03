// Imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require('dotenv').config()

// Database
const connectDB = require("./config/db");
connectDB();

// Set Port
const port = process.env.PORT || 5000;

// Initialize Express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/mentors', require('./routes/mentors'));
app.use('/students', require('./routes/students'));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static('client/build'));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// Listen to port
app.listen(port, () => console.log(`Port ${port} started`));