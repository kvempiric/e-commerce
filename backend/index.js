require("dotenv").config(); // This should be at the top of your entry file
// const { Router } = require("express");
const express = require("express");
const router  = require("./modules/auth/route.js");
const { connectMongoose } = require("./config/db");

const app = express();
const { PORT, MONGODB_URL } = process.env;
console.log("MONGODB_URL", MONGODB_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
