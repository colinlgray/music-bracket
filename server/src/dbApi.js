var pluralize = require("pluralize");
const { db } = require("../../database");

const makeGetterById = type => id => {
  return db[pluralize.singular(type)].findByPk(id);
};
const makeGetterAll = type => () => {
  return db.sequelize.sync().then(() => db[pluralize.singular(type)].findAll());
};

const makeCreator = type => params => {
  return db[pluralize.singular(type)].create(params);
};

module.exports = {
  makeCreator,
  makeGetterAll,
  makeGetterById
};
