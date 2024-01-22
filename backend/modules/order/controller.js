const Order = require("./model");
const { orderSchema } = require("./validator");

exports.order = async (req, res) => {
  let {
    userId,
    totalAmount,
    orderStatus,
    sellerRef,
    products,
    name,
    payment,
    address,
    phone,
  } = req.body;

  try {
    const { error } = orderSchema.validate(
      {
        userId,
        totalAmount,
        orderStatus,
        sellerRef,
        products,
        name,
        address,
        phone,
      },
      { error: { label: true, wrap: { label: false } } }
    );

    if (error) {
      return res.status(400).json({
        success: false,
        massage: error.message,
      });
    }
    const result = await Order.create({
      userId,
      name,
      phone,
      totalAmount,
      orderStatus,
      sellerRef,
      products,
      payment,
      address,
    });
    return res.status(200).json({
      success: true,
      message: "Order place successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.orderFetch = async (req, res) => {
  try {
    let result;
    result = await Order.find().lean();
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
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
