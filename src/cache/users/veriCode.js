const { cacheGet, cacheSet } = require("../index");

const PREFIX = "monkPhoneVeriCode-";

/**
 * 从缓存中获取验证码
 * @param {*} phoneNumber 手机号
 * @returns 验证码
 */
async function getVeriCodeFromCache(phoneNumber) {
  const key = `${PREFIX}${phoneNumber}`;
  const code = await cacheGet(key);
  if (code == null) {
    return code;
  }
  return code.toString();
}

async function setVeriCodeToCache(phoneNumber, veriCode, timeout) {
  const key = `${PREFIX}${phoneNumber}`;
  cacheSet(key, veriCode, timeout);
}

module.exports = {
  getVeriCodeFromCache,
  setVeriCodeToCache,
};
