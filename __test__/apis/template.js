const { get } = require("./_server");

describe("模版接口", () => {
  let TEMP_ID = "0";
  test("获取公共模版", async () => {
    const url = "/api/templates";
    const { errno, data } = await get(url);
    expect(errno).toBe(0);

    const { count, list = [] } = data;
    if (count > 0) {
      expect(list.length).toBeGreaterThat(0);
      TEMP_ID = list[0].id;
    }
  });

  test("获取单个模版", async () => {
    const url = `/api/templates/${TEMP_ID}`;

    const { errno, data } = await get(url);

    if (TEMP_ID === "0") {
      expect(errno).toBe(13003);
    } else {
      expect(errno).toBe(0);
    }
  });
});
