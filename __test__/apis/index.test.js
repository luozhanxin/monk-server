/**
 * API test -- 按顺序挨个执行
 */
require("./db-check");
require("./users"); // 先测试 user, 获取登录权限
require("./works");
