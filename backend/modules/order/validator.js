const Joi = require("joi");

const productSchema = Joi.object({
  productId: Joi.string().required(),
  qty: Joi.number().required(),
});

const orderSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.number().required(),
  address: Joi.string().required(),
  products: Joi.array().items(productSchema).required(),
  totalAmount: Joi.number().required(),
  orderStatus: Joi.string().required(),
  sellerRef: Joi.string().required(),
});
module.exports = {
  orderSchema,
};
