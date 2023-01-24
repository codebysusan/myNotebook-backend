const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { body, validationResult } = require("express-validator");
const User = require("../../models/User");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "THISISTHESECRETKEYFORJSONWEBTOKEN";

// Authenticate a user using POST : "/auth/login". Don't require login
router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  async (req, res) => {
    // Checking if the data passes all the validation test
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Checing if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Comparing password
      let result = bcrypt.compare(password, user.password);
      if (!result) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // Storing using id
      const data = {
        user: {
          id: user.id,
        },
      };

      // Generating authToken with the help of secret key
      const authToken = jwt.sign(data, JWT_SECRET);

      // Sending webtoken with user id
      res.json({ authToken });
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

module.exports = router;
