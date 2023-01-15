const mongoose = require("mongoose");
const { mongodbConf } = require("../config/index");

const { host, port, dbName, user, password } = mongodbConf;

// dev
let url = `mongodb://${host}:${port}`;
if (user && password) {
  // prod
  url = `mongodb://${user}:${password}@${host}:${port}`;
}

mongoose.connect(`${url}/${dbName}?authSource=admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("mongoose connect error", err);
});

// run node src/db/mongoose.js test connect
// db.once("open", () => {
//  console.log("mongoose connect success");
// });

module.exports = mongoose;
