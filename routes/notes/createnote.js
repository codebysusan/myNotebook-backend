const express = require("express");
const { body, validationResult } = require("express-validator");
const Note = require("../../models/Note");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");

router.post(
  "/createnote",
  fetchUser,
  [
    body("title", "Please fill title.").isLength({ min: 1 }),
    body("description", "Please fill description.").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // Checking if the data passes all the validation test
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { title, description, tags } = req.body;

    try {
      // Creating a note
      const note = await Note.create({
        userId,
        title,
        description,
        tags,
      });

      res.json({ note });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

module.exports = router;
