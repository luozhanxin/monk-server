const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");
const url = require("url");
const COS = require("cos-nodejs-sdk-v5");

const {
  tencentOSSConf,
  tencentOSS_CDNHost: CDNHost,
} = require("../config/index");

const cos = new COS({
  SecretId: tencentOSSConf.secretId, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
  SecretKey: tencentOSSConf.secretKey, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
});

const bucket = tencentOSSConf.ossBucket;
const region = tencentOSSConf.ossRegion;
const platform = os.platform();

function createFile(filepath, size, callback) {
  const cb = (err) => {
    if (callback) {
      callback(err);
    }
  };
  if (fs.existsSync(filepath)) {
    cb("file existed.");
  } else {
    let cmd;
    switch (platform) {
      case "win32":
        cmd = `fsutil file createnew ${filepath} ${size}`;
        break;
      case "darwin":
      case "linux":
        cmd = `dd if=/dev/zero of=${filepath} count=1 bs=${size}`;
        break;
      default:
        cmd = "";
    }
    exec(cmd, (err, stdout, stderr) => {
      cb(err);
    });
  }
}

/**
 * 替换 url 的 host 为 CDN host
 * @param {string} u url
 */
function replaceCDNHost(u = "") {
  if (!u) return u;
  const res = url.parse(u);
  const { protocol } = res;
  const u1 = `${protocol}//${CDNHost}${path}`; // 替换 CDN host
  return u1;
}

// 上传文件
async function uploadOSS(fileName, filePath) {
  const res = await cos.uploadFile({
    Bucket: bucket,
    Region: region,
    Key: fileName,
    FilePath: filePath,
    SliceSize: 1024 * 1024 * 5, // 大于5mb才进行分块上传
  });
  if (res.statusCode === 200) {
    // TODO: cdn
    return `https://${res.Location}`;
  }
  return "";
}

module.exports = uploadOSS;
