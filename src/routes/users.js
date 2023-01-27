/**
 * @description users router
 */
const router = require("koa-router")();
const { SuccessRes } = require("../res-model/index");

// 中间件
const loginCheck = require("../middlewares/loginCheck");
const genValidator = require("../middlewares/genValidator");

// validator
const {
  phoneNumberSchema,
  phoneNumberVeriCodeSchema,
  userInfoSchema,
} = require("../validator/users");

// controller
const sendVeriCode = require("../controller/users/sendVeriCode");
const loginByPhoneNumber = require("../controller/users/loginByPhoneNumber");
const updateUserInfo = require("../controller/users/updateUserInfo");

router.prefix("/api/users");

// 生成验证码
router.post("/genVeriCode", genValidator(phoneNumberSchema), async (ctx) => {
  const { phoneNumber, isRemoteTest } = ctx.request.body;

  // 发送验证码
  const res = await sendVeriCode(phoneNumber, isRemoteTest);
  ctx.body = res;
});

// 手机号登录
router.post(
  "/loginByPhoneNumber",
  genValidator(phoneNumberVeriCodeSchema),
  async (ctx) => {
    console.log(ctx.body);
    const { phoneNumber, veriCode } = ctx.request.body;
    const res = await loginByPhoneNumber(phoneNumber, veriCode);
    ctx.body = res;
  }
);

// 获取用户信息
router.get("/getUserInfo", loginCheck, (ctx) => {
  // 经过 loginCheck，用户信息在 ctx.userInfo
  ctx.body = new SuccessRes(ctx.userInfo);
});

// 修改用户信息
router.patch(
  "/updateUserInfo",
  loginCheck,
  genValidator(userInfoSchema),
  async (ctx) => {
    const res = await updateUserInfo(ctx.userInfo, ctx.request.body);
    ctx.body = res;
  }
);
module.exports = router;
