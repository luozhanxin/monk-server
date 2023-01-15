const usersInfos = require("./users");
const validate = require("./validate");

module.exports = {
  ...usersInfos,
  ...validate,
};
