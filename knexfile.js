require("dotenv").config({ path: "./.env" });

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.LOCAL_HOST,
      user: process.env.LOCAL_DB_USER,
      password: process.env.LOCAL_DB_PASSWORD,
      database: process.env.LOCAL_DB,
      charset: "utf8mb4",
      timezone: "utc"
    }
  },
  // production: {
  //   client: "mysql",
  //   connection: {
  //     host: process.env.LIVE_HOST,
  //     user: process.env.LIVE_DB_USER,
  //     password: process.env.LIVE_DB_PASSWORD,
  //     database: process.env.LIVE_DB,
  //     charset: "utf8mb4",
  //     timezone: "utc"
  //   }
  // }
};