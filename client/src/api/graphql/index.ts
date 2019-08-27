import ApolloClient, { gql } from "apollo-boost";
export const client = new ApolloClient();
export function query(query: string) {
  return client.query({
    query: gql(query)
  });
}
