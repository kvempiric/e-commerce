const mongoose = require("mongoose");

const connectMongoose = (url) => {
  return mongoose.connect(url)
}

module.exports = { connectMongoose }