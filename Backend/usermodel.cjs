const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/db");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image:String,
});
module.exports = mongoose.model("user", userSchema);
