/**
 * @description 工具函数
 */

const _ = require("lodash");

function isJson(value) {
  try {
    JSON.parse(value);
  } catch (ex) {
    return false;
  }
  return true;
}

/**
 * 将 obj 变为 string ，根据 key 排序
 * 如把 {b:2, a:1, c:3} 变为 'a=1&b=2&c=3'
 * @param {object} obj 对象
 */
function getSortedObjStr(obj = {}) {
  if (_.isEmpty(obj)) return "";

  const keys = Object.keys(obj).sort(); // 获取排序之后的 keys
  const arr = keys.map((key) => {
    const val = obj[key];
    return `${key}=${val}`;
  });
  return arr.join("&");
}

module.exports = {
  isJson,
  getSortedObjStr,
};
