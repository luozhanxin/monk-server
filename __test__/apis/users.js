/**
 * @description 用户 API 测试
 */

const { setToken, get, post, patch } = require("./_server");

describe("user info api", () => {
  const R = Math.random().toString().slice(-4);
  // 随机生成手机号
  const PHONE_NUMBER = `1550000${R}`;
  let VERI_CODE = "";
  let TOKEN = "";

  test("get veriCode", async () => {
    const url = "/api/users/genVeriCode";
    const { errno, data } = await post(url, {
      phoneNumber: PHONE_NUMBER,
      isRemoteTest: true, // test:remote
    });
    expect(errno).toBe(0);
    console.log("genVeriCode res:", data);

    VERI_CODE = data.code;
    expect(VERI_CODE).not.toBeNull();
  });

  test("error phone rule", async () => {
    const url = "/api/users/genVeriCode";
    const { errno, message } = await post(url, {
      phoneNumber: `${PHONE_NUMBER}sss`,
      isRemoteTest: true, // test:remote
    });
    expect(errno).toBe(11001);
    expect(message).toBe("输入数据的格式错误");
  });

  test("login by phoneNumber", async () => {
    const url = "/api/users/loginByPhoneNumber";
    const body = {
      phoneNumber: PHONE_NUMBER,
      veriCode: VERI_CODE,
    };
    console.log("loginByPhoneNumber req body", body);
    const { errno, data } = await post(url, body);
    expect(errno).toBe(0);

    TOKEN = data.token;
    expect(TOKEN).not.toBeNull();

    // 设置 token
    setToken(TOKEN);
  });

  test("get user info", async () => {
    const url = "/api/users/getUserInfo";
    const { data, errno } = await get(url);
    expect(errno).toBe(0);
    expect(data.phoneNumber).toBe(PHONE_NUMBER);
  });

  test("modify user info", async () => {
    const r = Math.random.toString().slice(-4);
    const url = "/api/users/updateUserInfo";
    const { data, errno } = await patch(url, {
      nickName: `xin${r}`,
      gender: 0,
    });
    expect(errno).toBe(0);
    const { token: newToken } = data;
    // 新 token 和之前的不一样
    expect(newToken).not.toBe(TOKEN);

    // 设置新 token
    setToken(newToken);
  });
});
