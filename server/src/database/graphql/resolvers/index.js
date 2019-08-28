const { db } = require("../../index");

const resolvers = {
  Query: {
    getBrackets: (parent, args) => {
      return db.Bracket.findAll({ where: args });
    },
    getBracket: (parent, args) => {
      return db.Bracket.findByPk(args.id, {
        include: [{ all: true }]
      });
    }
  }
};

export default resolvers;
