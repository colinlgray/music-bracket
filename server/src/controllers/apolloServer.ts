const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("../database/graphql/schema");
const resolvers = require("../database/graphql/resolvers");
const db = require("../database");

const server = new ApolloServer({
  typeDefs: gql(typeDefs.query),
  resolvers,
  context: { db }
});

export default server;
