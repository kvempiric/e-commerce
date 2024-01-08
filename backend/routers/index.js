const express = require("express");
const router = express.Router();
const { addProduct, products } = require("../modules/products/controller");
const { signup, signin } = require("../modules/auth/controller");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/product", addProduct);
router.get("/product", products);

module.exports = router;
