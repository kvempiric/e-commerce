const express = require("express");
const router = express.Router();
const { addProduct, products, updateProduct, deleteProduct } = require("../modules/products/controller");
const { signup, signin } = require("../modules/auth/controller");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/product", addProduct);
router.get("/product", products);
router.get("/product/:productId", products);
router.put("/product/:productId", updateProduct);
router.delete("/product/:productId", deleteProduct);

module.exports = router;
