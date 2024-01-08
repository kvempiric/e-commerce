const Product = require("./model");

// const { signupSchema } = require("../../utils/validator");

exports.addProduct = async (req, res) => {
  let { name, image, price, qty, rating, category } = req.body;

  try {
    console.log(name, image, price, qty, rating, category);
    const existProduct = await Product.findOne({ name });
    if (existProduct) {
      return res.status(400).json({
        success: false,
        message: "product already exists",
      });
    }

    const newProduct = await Product.create({
      name,
      image,
      price,
      qty,
      rating,
      category,
    });
    newProduct.save();

    return res.status(200).json({
      success: true,
      message: "product added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.products = async (req, res) => {
  const { productId } = req.params;
  try {
    if (!productId) {
      const result = await Product.find().lean();
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      console.log("result=====", result);
    } else {
      const result = await Product.findById(productId).lean();
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
    }
    return res.status(200).json({
      massage: "Fetch data successfully",
      isSuccess: true,
      item: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
