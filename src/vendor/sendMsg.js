/**
 * 第三方发送短信
 * @param {*} phoneNumber 手机号
 * @param {*} code 验证码
 * @param {*} timeout 过期时间，分钟
 */
async function sendVeriCodeMsg(phoneNumber, code, timeout = "") {
  if (!phoneNumber || !code) {
    return Promise.reject(new Error("手机号或验证码为空"));
  }
  return Promise.resolve("ok");
}

module.exports = {
  sendVeriCodeMsg,
};
