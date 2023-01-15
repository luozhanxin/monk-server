const router = require("koa-router")();
const testMysqlConn = require("../db/mysql2");
const { ENV } = require("../utils/env");
const packageInfo = require("../../package.json");

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});
// test mysql connect
router.get("/api/db-check", async (ctx, next) => {
  const mysqlRes = await testMysqlConn();
  ctx.body = {
    errno: 0,
    data: {
      name: "monk server",
      version: packageInfo.version,
      ENV,
      mysqlConn: mysqlRes.length > 0,
    },
  };
});

module.exports = router;
