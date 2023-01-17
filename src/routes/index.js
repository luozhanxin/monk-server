const router = require("koa-router")();
const testMysqlConn = require("../db/mysql2");
const { ENV } = require("../utils/env");
const packageInfo = require("../../package.json");
const { cacheGet, cacheSet } = require("../cache/index");

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Monk Server Run",
  });
});

// test mysql connect
router.get("/api/db-check", async (ctx, next) => {
  // test redis
  await cacheSet("name", "monk sever OK - by redis");
  const redisTestVal = await cacheGet("name");
  // test mysql
  const mysqlRes = await testMysqlConn();
  ctx.body = {
    errno: 0,
    data: {
      name: "monk server",
      version: packageInfo.version,
      ENV,
      redisConn: redisTestVal != null,
      mysqlConn: mysqlRes.length > 0,
    },
  };
});

module.exports = router;
