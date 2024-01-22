const express = require("express");
const router = express.Router();
const { addProduct, products, updateProduct, deleteProduct } = require("../modules/products/controller");
const { signup, signin } = require("../modules/auth/controller");
const { order, orderFetch } = require("../modules/order/controller");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/product", addProduct);
router.get("/product", products);
router.get("/product/:productId", products);
router.put("/product/:productId", updateProduct);
router.delete("/product/:productId", deleteProduct);
router.post("/order", order);
router.get("/order", orderFetch);

module.exports = router;
