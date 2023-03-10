const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { body, validationResult } = require("express-validator");
const User = require("../../models/User");

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Create a user using POST : "/auth/createUser". Don't require login
router.post(
  "/createUser",
  [
    body("firstName", "Please enter first name.").isLength({ min: 3 }),
    body("email", "Please enter a valid email.").isEmail(),
    body("password", "Password must be of 8 characters.").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // Checking if the data passes all the validation test
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const { firstName, lastName, email, password } = req.body;

      // Hashing password
      const hashPassword = await bcrypt.hash(password, saltRounds);

      // Finding if the user exists
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "User already exists." });
      }

      // Creating a user
      user = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });

      // Storing using id
      const data = {
        user:{
          id: user.id
        }
      }

      // Generating authToken with the help of secret key
      const authToken = jwt.sign(data, JWT_SECRET);

      // Sending webtoken with user id
      res.json({authToken});

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

module.exports = router;
