import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://trusted-pika-22.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "LdNr2bcW3L0LCEtYYqD0GI3KIx7aEobmSO88QevTQkoHraB9jK3tEMya6dBUU0ml",
      },
    },
  })
);

const httpLink = new HttpLink({
  uri: "https://trusted-pika-22.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "LdNr2bcW3L0LCEtYYqD0GI3KIx7aEobmSO88QevTQkoHraB9jK3tEMya6dBUU0ml",
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
