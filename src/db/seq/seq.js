const Sequelize = require("sequelize");
const { mysqlConf } = require("../../config/index");
const { isProd, isTest } = require("../../utils/env");

const { database, user, password, host, port } = mysqlConf;

const conf = {
  host,
  port,
  dialect: "mysql",
};

// 测试环境不打印日志
if (isTest) {
  conf.logging = () => {};
}

// 线上环境，连接池
if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000,
  };
}

const seq = new Sequelize(database, user, password, conf);
module.exports = seq;
