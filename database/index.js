const db = require("../database/models");

const startDb = () => {
  return db.sequelize.sync();
};

module.exports = {
  startDb
};
