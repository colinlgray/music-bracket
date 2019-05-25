module.exports = {
  development: {
    username: "root",
    password: null,
    database: "music_database",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "music_database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "music_database_production",
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
};
