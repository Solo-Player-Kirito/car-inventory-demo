const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});

const userModel = mongoose.model("authusers", user);

module.exports = {
  userModel,
};
