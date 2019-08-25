import ApolloClient, { gql } from "apollo-boost";
const apolloUri = "/graphql";
const client = new ApolloClient({
  uri: apolloUri
});

export async function fetchAll(modelName: string) {
  const result = await client.query({
    query: gql`
      {
        hello
      }
    `
  });
  console.log("result from example endpoint", result);
  return [];
}
