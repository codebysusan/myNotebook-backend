const express = require("express");
const fetchUser = require("../../middleware/fetchUser");
const Note = require("../../models/Note");
const router = express.Router();

router.get("/getallnotes", fetchUser, async (req, res) => {

  const userId = req.user.id;

  try {
    // Finding all the notes that belongs to the user.
    const notes = await Note.find({ userId });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
