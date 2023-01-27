const path = require("path");
const uploadOSS = require("../src/vendor/uploadOss");

describe("test 第三方服务", () => {
  test("上传文件到腾讯云 OSS", async () => {
    const fileName = "a.jpeg";
    const filePath = path.resolve(__dirname, "files", "a.jpeg");
    const url = await uploadOSS(fileName, filePath);
    console.info(url);
    expect(url).not.toBeNull();
    expect(url.lastIndexOf(fileName)).toBeGreaterThan(0);
  });
});
