require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    username: process.env.JAWS_DB_USER,
    password: process.env.JAWS_DB_PASS,
    database: process.env.JAWS_DB_DATABASE,
    host: process.env.JAWS_DB_HOST,
    dialect: "mysql",
    use_env_variable: "JAWSDB_URL"
  }
};