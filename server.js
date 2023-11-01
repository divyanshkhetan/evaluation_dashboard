// Imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const compression = require("compression");

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
app.use(compression({ level: 5 }));


// Routes
app.use('/mentors', require('./routes/mentors'));
app.use('/students', require('./routes/students'));


// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}


// Listen to port
app.listen(port, () => console.log(`Listening on port ${port}`));