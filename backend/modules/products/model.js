const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      isRequired: true,
    },
    image: {
      type: Number,
      isRequired: true,
    },
    price: {
      type: String,
      isRequired: true,
      unique: true,
    },
    qty: {
      type: String,
      isRequired: true,
    },
    rating: {
      type: Number,
      isRequired: true,
    },
    category: {
      type: String,
      isRequired: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);