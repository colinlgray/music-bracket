module.exports = {
  development: {
    username: "root",
    password: null,
    database: "music_database",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: true
  },
  test: {
    username: "root",
    password: null,
    database: "music_database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
};
