module.exports = {
  // 密码加密 密钥
  PASSWORD_SECRET: "wkjkdsfjksf_9989",
  JWT_SECRET: "secret_for-json#2023/1/15#token",
  // jwt 可忽略 path：全部忽略即可，需要登录验证的，使用 loginCheck
  JWT_IGNORE_PATH: [/\//],
  // 查询列表，默认分页配置
  DEFAULT_PATH_SIZE: 8,
};
