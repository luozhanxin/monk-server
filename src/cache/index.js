const redisClient = require("../db/redis");
const { isJson } = require("../utils/util");

/**
 * redis set
 * @param {string} key key
 * @param {string|Object} val val
 * @param {number} timeout 过期时间，单位 s ，默认 1h
 */
async function cacheSet(key, val, timeout = 60 * 60) {
  let formatVal;
  if (typeof val === "object") {
    formatVal = JSON.stringify(val);
  } else {
    formatVal = val;
  }
  if (redisClient.isOpen === false && redisClient.isReady === false) {
    await redisClient.connect();
  }
  await redisClient.set(key, formatVal);
  await redisClient.expire(key, timeout);
  // await redisClient.disconnect();
}

/**
 * redis get
 * @param {string} key key
 */
async function cacheGet(key) {
  if (redisClient.isOpen === false && redisClient.isReady === false) {
    await redisClient.connect();
  }
  const value = await redisClient.get(key);
  if (isJson(value)) {
    return JSON.parse(value);
  }
  return value;
}

module.exports = {
  cacheSet,
  cacheGet,
};
