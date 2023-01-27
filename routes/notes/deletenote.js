const express = require("express");
const fetchUser = require("../../middleware/fetchUser");
const Note = require("../../models/Note");
const router = express.Router();

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  const userId = req.user.id;
  const noteId = req.params.id;

  try {
    // Finding a note with the given data
    let note = await Note.find({
      userId,
      _id: noteId,
    });

    // If the note is not found that match the given parameters error is sent
    if (!note) {
      return res.status(404).json({ error: "Not Found" });
    }

    // Note is deleted here.
    await Note.findByIdAndDelete(noteId);

    res.json({ success: "Note has been successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
