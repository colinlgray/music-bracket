const pluralize = require("pluralize");
const { db } = require("../database");

const makeGetterById = type => id => {
  return db[pluralize.singular(type)].findByPk(id, {
    include: [{ all: true }]
  });
};

const makePutById = type => body => {
  return db[pluralize.singular(type)].upsert(body);
};

const makeGetterAll = type => () => {
  return db[pluralize.singular(type)].findAll();
};

const makeCreator = type => params => {
  return db[pluralize.singular(type)].create(params);
};

module.exports = {
  makeCreator,
  makeGetterAll,
  makeGetterById,
  makePutById
};
