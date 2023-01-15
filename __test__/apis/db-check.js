const { get } = require("./_server");
test("db connect", async () => {
  const { data, errno } = await get("/api/db-check");
  const { mysqlConn } = data;

  expect(errno).toBe(0);
  expect(mysqlConn).toBe(true);
});
