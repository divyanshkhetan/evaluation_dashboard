const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.js");
const Mentor = require("../models/Mentor.js");

const router = express.Router();

// GET: Get logged in user
router.get("/", auth, async (req, res) => {
  // Extract user id from request
  const user_id = req.user_id;

  try {
    // Find user by id
    let user = await Mentor.findOne({ _id: user_id });

    // If user not found
    if (!user) {
      return res.status(400).send({ errors: [{ msg: "User not found" }] });
    }

    // Store user data in response
    user = {
      name: user.Name,
      students: user.students,
      locked: user.Locked,
    };

    // Return user to the client
    return res.send(user);
  } catch (err) {
    // Return error
    return res.status(500).send({ errors: [{ msg: err.message }] });
  }
});

// POST: Authorize user and get token
router.post("/", async (req, res) => {
  // Destructure request body
  const { id } = req.body;

  try {
    // Find user by email
    let user = await Mentor.findOne({ _id: id });

    // If user not found
    if (!user) {
      return res.status(400).send({ errors: [{ msg: "User not found" }] });
    }

    // Payload for JWT
    const payload = {
      id: user.id,
    };

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 21600,
    });

    // Create an httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 6 * 60 * 60 * 1000,
    });

    // Send success message to client
    return res.send("Logged in");
  } catch (err) {
    // Return error
    return res.status(500).send({ errors: [{ msg: err.message }] });
  }
});

// DELETE: Delete cookie / logout
router.delete("/", auth, async (req, res) => {
  // Delete cookie
  res.clearCookie("token");

  // Send success message to client
  return res.send("Logged out");
});

module.exports = router;
