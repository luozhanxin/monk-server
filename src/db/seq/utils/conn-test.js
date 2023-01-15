const seq = require("../seq");
// test connect ,run node src/db/seq/utils/conn-test.js
seq
  .authenticate()
  .then(() => {
    console.log("ok");
  })
  .catch(() => {
    console.log("fail");
  })
  .finally(() => {
    process.exit();
  });
