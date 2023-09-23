const  createPool = require("mysql2-promise");

module.export  = createPool({
  host: "localhost",
  user: "root",
  password: "navarro",
  port: 3306,
  database: "customersdb",
});