/**
 * @description template router
 */
const router = require("koa-router")();

// controller
const {
  findPublicTemplates,
  findOneTemplate,
} = require("../controller/works/findTemplate");

router.prefix("/api/templates");

// 获取公共模版
router.get("/", async (ctx) => {
  const { title, pageIndex = 0, pageSize = 8 } = ctx.query;
  const res = await findPublicTemplates({ title }, { pageIndex, pageSize });
  ctx.body = res;
});

// 查询单个公共模版
router.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  const res = await findOneTemplate(id);
  ctx.body = res;
});
module.exports = router;
