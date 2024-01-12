require("dotenv").config();
const express = require("express");
const router = require("./routers/index");
const { connectMongoose } = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();
const { PORT, MONGODB_URL } = process.env;
console.log("MONGODB_URL", MONGODB_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
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
