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
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql",
    logging: false
  }
};
