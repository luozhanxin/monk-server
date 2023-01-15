const redis = require("redis");

const { redisConf } = require("../config/index");

const { port, host, password } = redisConf;

const opt = {};
if (password) {
  // prod
  opt.password = password;
}

const redisClient = redis.createClient(port, host, opt);
redisClient.on("error", (err) => {
  console.log("redis connect error", err);
});

// run node src/db/redis.js test connect
//redisClient.on("connect", () => {
//  console.log("redis connect success");
//  redisClient.set("foo", "bar", redis.print);
//  redisClient.get("foo", redis.print);
//  redisClient.quit();
//});

module.exports = redisClient;
