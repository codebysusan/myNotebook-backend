const mongoose = require("mongoose");

const UserSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  secondName: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password:{
    type: String,
    require: true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("user", UserSchema);
