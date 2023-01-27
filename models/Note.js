const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  tags: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Note =  mongoose.model("note", NotesSchema);

module.exports =  Note;
