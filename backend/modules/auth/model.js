const { Schema } = require("mongoose");
const mongoose = require("mongoose");


const userSchema = new Schema({
  name: {
    type: String,
    isRequired: true,
  },
  phone: {
    type: Number,
    isRequired: true,
  },
  email: {
    type: String,
    isRequired: true,
    unique: true,
  },
  password: {
    type: String,
    isRequired: true,
  },
  Address: {
    type: String,
    isRequired: true,
  },
  role: {
    type: String,
    isRequired: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
