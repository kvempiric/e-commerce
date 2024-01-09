require("dotenv").config();
// const { Router } = require("express");
const express = require("express");
const router  = require("./routers/index");
const { connectMongoose } = require("./config/db");
const multer = require("multer");
const path = require("path");

const app = express();
const { PORT, MONGODB_URL } = process.env;
console.log("MONGODB_URL", MONGODB_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Set storage images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer middleware
const upload = multer({
  storage: storage,
}).single("mainImage");

const uploadAdditionalImages = multer({
  storage: storage,
}).array("multipaleImages", 5);



app.use("/", router);




app.listen(PORT, () => {
  connectMongoose(MONGODB_URL)
    .then(() => {
      console.log(`db has connected with the port ${PORT}`);
    })
    .catch((err) => {
      console.log("error", err);
    });
});
