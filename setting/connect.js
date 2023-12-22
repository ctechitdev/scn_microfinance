const { createPool } = require("mysql");

const connected = createPool({
  host: "rm-0jo2g7pe17tc8x62kmo.mysql.ap-southeast-7.rds.aliyuncs.com",
  user: "ctech_dev_scnmf",
  database: "ctech_dev_scnmf",
  password: "CTECH@123#",
});

module.exports = connected;
 