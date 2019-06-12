import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "../database/graphql/schema";
import resolvers from "../database/graphql/resolvers";
import db from "../database";

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db }
});

export default server;
