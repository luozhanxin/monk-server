/**
 * jest server
 */

const axios = require("axios");
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require("supertest");
const { isTestRemote, isTestLocal } = require("../../src/utils/env");

let request;
if (isTestLocal) {
  // 本地测试使用 supertest。 src/app 也要在此引用
  // eslint-disable-next-line global-require
  const server = require("../../src/app").callback();
  request = supertest(server);
}

// 存储登录 token，统一拼接 headers.Authorization
let TOKEN = "";

// remote host
const REMOTE_HOST = "http://43.137.4.245:8081";

/**
 * 发送请求
 * @param {string} method method
 * @param {string} url url
 * @param {object} bodyOrParams  body/query
 * @param {object} headers headers
 */
async function ajax(method = "get", url = "", bodyOrParams = {}, headers = {}) {
  // headers add token
  if (headers.Authorization == null) {
    Object.assign(headers, {
      Authorization: `Bearer ${TOKEN}`,
    });
  }
  let result;

  // 本地测试，使用 supertest
  if (isTestLocal) {
    let res;
    if (method === "get") {
      res = await request[method](url).query(bodyOrParams).set(headers);
    } else {
      res = await request[method](url).send(bodyOrParams).set(headers);
    }
    result = res.body;
  }

  // 远程测试，使用 axios ，访问测试机
  if (isTestRemote) {
    const remoteUrl = `${REMOTE_HOST}${url}`;
    const conf = {
      method,
      url: remoteUrl,
      headers,
    };
    if (method === "get") {
      conf.params = bodyOrParams;
    } else {
      conf.data = bodyOrParams;
    }
    const res = await axios(conf);
    result = res.data;
  }

  // 返回结果
  return result; // { data, errno }
}

module.exports = {
  setToken(token) {
    console.log("setToken...", token);
    TOKEN = token;
  },
  async get(url, params) {
    const res = await ajax("get", url, params);
    return res;
  },
  async post(url, body) {
    const res = await ajax("post", url, body);
    return res;
  },
  async patch(url, body) {
    const res = await ajax("patch", url, body);
    return res;
  },
  async del(url, body) {
    const res = await ajax("delete", url, body);
    return res;
  },
};
