const { productSchema } = require("../../utils/validator");
const Product = require("./model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set storage images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadImages = multer({
  storage: storage,
}).fields([
  { name: "images", maxCount: 5 },
  { name: "mainImage", maxCount: 1 },
]);

exports.addProduct = (req, res) => {
  uploadImages(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    let { name, price, qty, rating, category } = req.body;
    const mainImage = req.files.mainImage[0].path;
    const images = req.files?.images
      ? req.files?.images.map((file) => file.path)
      : [];

    try {
      const { error } = productSchema.validate(
        { name, mainImage, images, price, qty, rating, category },
        { error: { label: true, wrap: { label: false } } }
      );

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      const existProduct = await Product.findOne({ name });
      if (existProduct) {
        return res.status(400).json({
          success: false,
          message: "Product already exists",
        });
      }

      const newProduct = await Product.create({
        name,
        mainImage,
        images,
        price,
        qty,
        rating,
        category,
      });
      newProduct.save();

      return res.status(200).json({
        success: true,
        message: "Product added successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
};

exports.products = async (req, res) => {
  const { productId } = req.params;
  try {
    let result;
    if (!productId) {
      result = await Product.find().lean();
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
    } else {
      result = await Product.findById(productId).lean();
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
    }

    return res.status(200).json({
      massage: "Data fetch successfully",
      isSuccess: true,
      count: result.length,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  uploadImages(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    const { productId } = req.params;
    let { name, price, qty, rating, category } = req.body;

    const mainImage = req.files.mainImage
      ? req.files.mainImage[0].path
      : undefined;

    const images = req.files?.images
      ? req.files?.images.map((file) => file.path)
      : [];

    try {
      const { error } = productSchema.validate(
        { name, mainImage, images, price, qty, rating, category },
        { error: { label: true, wrap: { label: false } } }
      );

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Delete old images of product
      if (existingProduct.images && existingProduct.images.length > 0) {
        existingProduct.images.forEach((imagePath) => {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${imagePath}`, err);
            } else {
              console.log(`File deleted: ${imagePath}`);
            }
          });
        });
      }

      // Delete old mainImage of product
      fs.unlink(existingProduct.mainImage, (err) => {
        if (err) {
          console.error(
            `Error deleting file: ${existingProduct.mainImage}`,
            err
          );
        } else {
          console.log(`File deleted: ${existingProduct.mainImage}`);
        }
      });

      const updatedData = {
        name,
        price,
        qty,
        rating,
        category,
      };

      if (mainImage) {
        updatedData.mainImage = mainImage;
      }
      if (images.length > 0) {
        updatedData.images = images;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        updatedProduct,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
