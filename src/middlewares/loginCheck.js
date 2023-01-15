const { jwtVerify } = require("../utils/jwt");
const { ErrorRes } = require("../res-model/index");
const { loginCheckFailInfo } = require("../res-model/failInfo/index");

module.exports = async function loginCheck(ctx, next) {
  // error info
  const errRes = new ErrorRes(loginCheckFailInfo);
  // get token
  const token = ctx.header.authorization;
  if (!token) {
    ctx.body = errRes;
    return;
  }
  let flag = true;
  try {
    const userInfo = await jwtVerify(token);
    delete userInfo.password;
    ctx.userInfo = userInfo;
  } catch (ex) {
    flag = false;
    ctx.body = errRes;
  }
  if (flag) {
    await next();
  }
};
