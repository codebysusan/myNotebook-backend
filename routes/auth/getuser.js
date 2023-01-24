const express = require("express");
const router = express.Router();
const fetchUser = require('../../middleware/fetchUser');

const User = require("../../models/User");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Create a user using POST : "/auth/createUser". Login is required
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
