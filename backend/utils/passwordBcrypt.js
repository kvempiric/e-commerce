const bcrypt = require("bcrypt");

const passwordBcrypt = async (password) => {
  return await bcrypt.hash(password, 10);
};

const checkBcryptPassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword)
};

module.exports = { passwordBcrypt, checkBcryptPassword };
