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
  jwtExpiresIn: 86400,
  corsOrigin: "*",

  msgVeriCodeTimeout: "120",

  // h5 host
  h5Origin: "https://h5-test.monk.com",
};
