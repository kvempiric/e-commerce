const User = require("./model");
// const signupSchema = require("../utils/validator");
// const userTypes = require("../constants/index");
const mongoose = require("mongoose");

exports.signup = async (req, res) => {
  try {
    console.log("req=================>>>>", req);

    const { name, email, password, role, address, phone } = req.body;
    console.log(
      "=================>>>>",
      name,
      email,
      password,
      role,
      address,
      phone
    );
    return res.status(200).json({
      success: true,
      message: "Signup Successful...",
    });
    // const { error } = signupSchema.validate(
    //   {
    //     name,
    //     email,
    //     password,
    //     role,
    //   },
    //   { error: { label: true, wrap: { label: false } } }
    // );

    // const isVendarId = role == userTypes.customer;
    // const isvendarInvalid =
    //   isVendarId && !mongoose.Types.ObjectId.isValid(venderUid);

    // if (isvendarInvalid || error) {
    //   return res.status(400).json({
    //     success: false,
    //     massage: isvendarInvalid ? "venderUid is required" : error.message,
    //   });
    // }

    // if (role == userTypes.customer || role == userTypes.vendor) {
    //   const existUser = await User.findOne({ email: email });
    //   if (existUser) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "User already exists",
    //     });
    //   }

    //   const user = await User.create({
    //     name,
    //     email,
    //     password,
    //     role,
    //     isApproved,
    //     venderUid: isVendarId ? venderUid : undefined,
    //   });
    //   user.save();

    //   return res.status(200).json({
    //     success: true,
    //     message: "Signup Successful...",
    //   });
    // } else {
    //   return res.status(400).json({
    //     success: false,
    //     massage: "you can't access it, type must be vendor or customer",
    //   });
    // }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// exports.signin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const { error } = signinSchema.validate({
//       email,
//       password,
//     });

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//     const result = await User.findOne({email}).lean()

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found...",
//       });
//     }
//     if (result.password != password) {
//       return res.status(400).json({
//         success: false,
//         message: "Incurrect password, please Enter currect Password"
//       })
//     }
//     // console.log("user==========>",result);
//     return res.status(200).json({
//       massage: "Login successfully",
//       isSuccess: true,
//     })

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
