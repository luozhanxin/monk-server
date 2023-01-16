module.exports = {
  // mysql connect config
  mysqlConf: {
    host: "monk-mysql",
    user: "root",
    password: "monk2023",
    port: "3306",
    database: "monktestdb",
  },
  // mongodb connect config
  mongodbConf: {
    host: "monk-mongodb",
    port: "27017",
    user: "root",
    password: "monk2023",
    dbName: "monktestdb",
  },
  // redis connect config
  redisConf: {
    port: "6379",
    host: "monk-redis",
  },
  // jwt 过期时间
  jwtExpiresIn: "1d", // 1. 字符串，如 '1h' '2d'； 2. 数字，单位是 s
  corsOrigin: "*",
};
