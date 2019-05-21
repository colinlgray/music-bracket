const db = require("../database/models");

const startDb = () => {
  db.sequelize.sync();
};

module.exports = {
  startDb
};
