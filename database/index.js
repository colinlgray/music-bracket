const db = require("./models");

const startDb = () => {
  return db.sequelize.sync();
};

module.exports = {
  startDb,
  db
};
