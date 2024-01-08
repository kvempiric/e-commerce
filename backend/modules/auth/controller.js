const User = require("./model");
const { signupSchema, signinSchema } = require("../../utils/validator");
const {
  passwordBcrypt,
  checkBcryptPassword,
} = require("../../utils/passwordBcrypt");

exports.signup = async (req, res) => {
  let { name, email, password, role, address, phone } = req.body;
  try {
    const { error } = signupSchema.validate(
      { name, email, password, role, address, phone },
      { error: { label: true, wrap: { label: false } } }
    );

    if (error) {
      return res.status(400).json({
        success: false,
        massage: error.message,
      });
    }

    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashPassword = await passwordBcrypt(password);
    password = hashPassword;

    const user = await User.create({
      name,
      email,
      password,
      role,
      address,
      phone,
    });
    user.save();

    return res.status(200).json({
      success: true,
      message: "Signup Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const result = await User.findOne({ email }).lean();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not exist, please signup this user",
      });
    }

    const checkPassword = await checkBcryptPassword(password, result.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Incurrect password, please Enter currect Password",
      });
    }

    return res.status(200).json({
      massage: "Login successfully",
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
