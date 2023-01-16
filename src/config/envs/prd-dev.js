module.exports = {
  // mysql connect config
  mysqlConf: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: "11100",
    database: "apps_db",
  },
  // mongodb connect config
  mongodbConf: {
    host: "localhost",
    port: "27017",
    dbName: "apps_db",
  },
  // redis connect config
  redisConf: {
    port: "11300",
    host: "127.0.0.1",
  },
  // jwt 过期时间
  jwtExpiresIn: "1d", // 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s
  corsOrigin: "*",
};
