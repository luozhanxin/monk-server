module.exports = {
  // mysql connect config
  mysqlConf: {
    host: "localhost",
    user: "root",
    password: "monk2023",
    port: "3305",
    database: "monkdevdb",
  },
  // mongodb connect config
  mongodbConf: {
    host: "localhost",
    port: "27016",
    dbName: "monkdevdb",
  },
  // redis connect config
  redisConf: {
    port: "6378",
    host: "localhost",
  },
  // jwt 过期时间
  jwtExpiresIn: 86400,
  corsOrigin: "*",
  // 短信发送过期时间
  msgVeriCodeTimeout: "60",
};
