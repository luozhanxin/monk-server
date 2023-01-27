/**
 * @description 发送短信验证码
 */
const {
  getVeriCodeFromCache,
  setVeriCodeToCache,
} = require("../../cache/users/veriCode");
const { sendVeriCodeMsg } = require("../../vendor/sendMsg");

const {
  sendVeriCodeFrequentlyFailInfo,
  sendVeriCodeErrorFailInfo,
} = require("../../res-model/failInfo/index");
const { ErrorRes, SuccessRes } = require("../../res-model/index");
const { msgVeriCodeTimeout } = require("../../config/index");
const { isPrd, isTest } = require("../../utils/env");

/**
 * 发送验证码
 * @param {*} phoneNumber 手机号
 * @param {*} isRemoteTest 是否测试
 */
async function sendVeriCode(phoneNumber, isRemoteTest = false) {
  // 从缓存中获取验证码，看是否有效
  const codeFromCache = await getVeriCodeFromCache(phoneNumber);
  if (codeFromCache) {
    if (!isPrd) {
      // 非线上环境
      return new SuccessRes({ code: codeFromCache });
    }
    // 限制线上重复发送
    return new ErrorRes(sendVeriCodeFrequentlyFailInfo);
  }
  // 缓存中没有，则发送
  // 生成随机数
  const veriCode = Math.random().toString().slice(-4);
  let sendSuccess = false;

  if (isTest) {
    // 测试环境，不发送验证码，直接返回
    sendSuccess = true;
  } else if (isRemoteTest) {
    // 用于远程接口测试，不发短信
    sendSuccess = true;
  } else {
    // 正式发送短信
    try {
      // 短信提示的过期时间（单位分钟)
      const msgTimeoutMin = (msgVeriCodeTimeout / 60).toString();
      // 发送短信
      await sendVeriCodeMsg(phoneNumber, veriCode, msgTimeoutMin);
      sendSuccess = true;
    } catch (error) {
      sendSuccess = false;
      console.error("发送短信验证码失败", error);
    }
  }

  if (!sendSuccess) {
    return new ErrorRes(sendVeriCodeErrorFailInfo);
  }
  // 发送成功，，设置缓存，过期时间
  setVeriCodeToCache(phoneNumber, veriCode, msgVeriCodeTimeout);

  // 返回成功信息
  const resData = isPrd ? {} : { code: veriCode }; // 非线上环境，返回验证码
  return new SuccessRes(resData);
}

module.exports = sendVeriCode;
