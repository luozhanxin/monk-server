const mysql = require("mysql2/promise");
const { mysqlConf } = require("../config/index");

async function testMysqlConn() {
  const connection = await mysql.createConnection(mysqlConf);
  const [rows] = await connection.execute("select now()");
  return rows;
}

// run node/src/db/mysql2.js test
//(async () => {
//  // [ { 'now()': 2023-01-15T09:46:54.000Z } ]
//  const rows = await testMysqlConn();
//  console.log(rows);
//})();
module.exports = testMysqlConn;
