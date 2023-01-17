/**
 * @description 手机号验证码登录
 */
const { getVeriCodeFromCache } = require("../../cache/users/veriCode");
const {
  loginVeriCodeIncorrectFailInfo,
  createUserDbErrorFailInfo,
  userFrozenFailInfo,
} = require("../../res-model/failInfo/index");
const { ErrorRes, SuccessRes } = require("../../res-model/index");

const {
  findOneUserService,
  createUserService,
  updateUserInfoService,
} = require("../../service/users");
const doCrypto = require("../../utils/cryp");
const genPassword = require("../../utils/genPassword");
const { jwtSign } = require("../../utils/jwt");

/**
 * 通过手机验证码登录
 * @param {*} phoneNumber 手机号
 * @param {*} veriCode 验证码
 */
async function loginByPhoneNumber(phoneNumber, veriCode) {
  const veriCodeFromCache = await getVeriCodeFromCache(phoneNumber);
  if (veriCode !== veriCodeFromCache) {
    // 验证码不正确
    return new ErrorRes(loginVeriCodeIncorrectFailInfo);
  }
  // 查找用户
  const userInfo = await findOneUserService({
    phoneNumber,
  });
  if (userInfo) {
    // 用户是否冻结
    if (userInfo.isFrozen) {
      return new ErrorRes(userFrozenFailInfo);
    }
    // 更新登录时间
    try {
      await updateUserInfoService(userInfo.username, {
        latestLoginAt: new Date(),
      });
    } catch (error) {
      // 只打印错误，不影响主业务
      console.error("更新最后登录时间错误", error);
    }

    // 返回登录成功信息
    return new SuccessRes({
      token: jwtSign(userInfo),
    });
  }
  // 查找不到，创建用户
  let password = genPassword(); // 随机密码
  password = doCrypto(password); // 密码加密存储

  try {
    const newUser = await createUserService({
      username: phoneNumber,
      password,
      phoneNumber,
      nickName: `monk${phoneNumber.slice(-4)}`,
      latestLoginAt: new Date(),
    });
    // 创建成功
    return new SuccessRes({
      token: jwtSign(newUser),
    });
  } catch (error) {
    console.error("创建用户失败", error);
    return new ErrorRes(createUserDbErrorFailInfo);
  }
}

module.exports = loginByPhoneNumber;
