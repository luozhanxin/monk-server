module.exports = {
  // mysql connect config
  mysqlConf: {
    host: "localhost",
    user: "root",
    password: "monk2023",
    port: "3305",
    database: "monktestdb",
  },
  // mongodb connect config
  mongodbConf: {
    host: "localhost",
    port: "27016",
    user: "root",
    password: "monk2023",
    dbName: "monktestdb",
  },
  // redis connect config
  redisConf: {
    port: "6378",
    host: "localhost",
  },
  // jwt 过期时间
  jwtExpiresIn: "1d", // 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s
  corsOrigin: "*",
};
