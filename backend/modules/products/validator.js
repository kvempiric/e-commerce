const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  mainImage: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  price: Joi.number().required(),
  availableQty: Joi.number().integer().required(),
  rating: Joi.number().integer().min(0).max(5).required(),
  category: Joi.string().required(),
});

module.exports = {
  productSchema,
};
