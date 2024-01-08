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
  // image: Joi.string().required(),
  price: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  qty: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  rating: Joi.string()
    .pattern(/^[0-5]+$/)
    .required(),
  category: Joi.string().required(),
});

module.exports = {
  signupSchema,
  signinSchema,
  productSchema,
};
