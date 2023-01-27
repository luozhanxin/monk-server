const redis = require("redis");

const { redisConf } = require("../config/index");

const { port, host, password } = redisConf;

// dev
let connectUrl = `redis://${host}:${port}`;
if (password) {
  // prod
  connectUrl = `redis://root:${password}@${host}:${port}`;
}

const opt = {};
if (password) {
  // prod
  opt.password = password;
}

const redisClient = redis.createClient({ url: connectUrl });
redisClient.on("error", (err) => {
  console.log("redis connect error", err);
});

// run node src/db/redis.js test connect
// (async () => {
//  await redisClient.connect();
//  await redisClient.set("name", "zhanxin1");
//  const value = await redisClient.get("name");
//  console.log(value);
// })();

module.exports = redisClient;
