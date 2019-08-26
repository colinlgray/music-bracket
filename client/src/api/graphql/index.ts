import ApolloClient, { gql } from "apollo-boost";
import { get } from "lodash";
const apolloUri = "/graphql";
const client = new ApolloClient({
  uri: apolloUri
});

export async function fetchAll(modelName: string) {
  const result = await client.query({
    query: gql`
      {
        startedBrackets {
          id
          name
        }
      }
    `
  });
  return get(result, "data.startedBrackets");
}

export async function helloGraphQL() {
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
