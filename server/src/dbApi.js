var pluralize = require("pluralize");
const db = require("../../database/models");

const makeGetterById = type => ({ id }) =>
  db[pluralize.singular(type)].findByPk(id);

const makeGetterAll = type => () => {
  return db[pluralize.singular(type)].findAll();
};

const makeCreator = type => params => {
  console.log("type", type, pluralize.singular(type), Object.keys(db));
  return db[pluralize.singular(type)].create(params);
};

module.exports = {
  makeCreator,
  makeGetterAll,
  makeGetterById
};
