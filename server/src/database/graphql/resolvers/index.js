const { db } = require("../../index");

const resolvers = {
  Query: {
    getBrackets: (parent, args) => {
      return db.Bracket.findAll({ where: args });
    }
  }
};

export default resolvers;
