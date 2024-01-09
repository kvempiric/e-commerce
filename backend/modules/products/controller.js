const { signupSchema, signinSchema } = require("../../utils/validator");
const Product = require("./model");
const multer = require("multer");
const path = require("path");

// Set storage images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer middleware
const upload = multer({
  storage: storage,
}).single("mainImage");

const uploadAdditionalImages = multer({
  storage: storage,
}).array("photos", 5);

exports.addProduct = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    let mainImage = req.file ? req.file.path : null;

    uploadAdditionalImages(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      let { name, price, qty, rating, category } = req.body;
      let photos = req.files ? req.files.map((file) => file.path) : [];

      try {
        const { error } = productSchema.validate(
          { name, mainImage, photos, price, qty, rating, category },
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
          photos,
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
  });
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
