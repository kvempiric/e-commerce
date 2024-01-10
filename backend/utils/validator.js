const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().required(),
  role: Joi.string().required(),
});

const signinSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
});

const productSchema = Joi.object({
  name: Joi.string().required(),
  mainImage: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  price: Joi.number().required(),
  qty: Joi.number().integer().required(),
  rating: Joi.number().integer().min(0).max(5).required(),
  category: Joi.string().required(),
});

module.exports = {
  signupSchema,
  signinSchema,
  productSchema,
};
