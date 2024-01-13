const { createPool } = require("mysql");

const connected = createPool({
  host: "rm-0jo2g7pe17tc8x62kmo.mysql.ap-southeast-7.rds.aliyuncs.com",
  user: "scn_microfinance",
  database: "scn_microfinance",
  password: "Admin@123#",
});

module.exports = connected;
 