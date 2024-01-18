const Joi = require("joi");

const productSchema = Joi.object({
  productId: Joi.string().required(),
  qty: Joi.number().required(),
});

const orderSchema = Joi.object({
  orderId: Joi.string().required(),
  userId: Joi.string().required(),
  products: Joi.array().items(productSchema).required(),
  totalAmount: Joi.number().required(),
  orderStatus: Joi.string().required(),
  sellerRef: Joi.string().required(),
});
module.exports = {
  orderSchema,
};
