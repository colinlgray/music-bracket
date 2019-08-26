const { db } = require("../../index");

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    startedBrackets: () => {
      // TODO: Consolidate constants
      return db.Bracket.findAll({ where: { creationState: "started" } });
    }
  }
};

export default resolvers;
