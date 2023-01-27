const util = require("util");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constant");
const { jwtExpiresIn } = require("../config/index");

const verify = util.promisify(jwt.verify);

/**
 * jwt verify
 * @param {string} token
 */
async function jwtVerify(token) {
  // remove 前面的 Bay
  const data = await verify(token.split(" ")[1], JWT_SECRET);
  return data;
}

/**
 * jwt sign
 * @param {Object} data
 * @returns
 */
function jwtSign(data) {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: jwtExpiresIn });
  return token;
}

module.exports = {
  jwtVerify,
  jwtSign,
};
