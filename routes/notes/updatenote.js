const express = require("express");
const fetchUser = require("../../middleware/fetchUser");
const Note = require("../../models/Note");
const router = express.Router();

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const userId = req.user.id;
  const noteId = req.params.id;
  const { title, description, tags } = req.body;
  // Creating a newNote object
  let newNote = {};

  try {
    // Finding a specific note
    let note = await Note.find({
      userId,
      _id: noteId,
    });

    // If note isn't found send error message
    if (!note) {
      return res.status(404).json({ error: "Not Found" });
    }

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tags) {
      newNote.tags = tags;
    }

    // Find and update the note
    // new: true will give the object after the update was applied.
    note = await Note.findByIdAndUpdate(
      noteId,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
