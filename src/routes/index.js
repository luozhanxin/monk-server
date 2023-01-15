const router = require("koa-router")();
const testMysqlConn = require("../db/mysql2");
const { ENV } = require("../utils/env");
const packageInfo = require("../../package.json");

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Monk Server Run",
  });
});

// test mysql connect
router.get("/api/db-check", async (ctx, next) => {
  const mysqlRes = await testMysqlConn();
  ctx.body = {
    errno: 0,
    data: {
      name: "monk server1",
      version: packageInfo.version,
      ENV,
      mysqlConn: mysqlRes.length > 0,
    },
  };
});

module.exports = router;
