const knex = require("knex")({
    client: "mysql",
    connection: {
      host: process.env.LOCAL_HOST,
      user: process.env.LOCAL_DB_USER,
      password: process.env.LOCAL_DB_PASSWORD,
      database: process.env.LOCAL_DB,
      charset: "utf8mb4",
      timezone: "utc"
    }
  });
  module.exports = knex;
  