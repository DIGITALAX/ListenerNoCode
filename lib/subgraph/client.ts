import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://api.thegraph.com/subgraphs/name/digitalax/lit-listener",
});

export const graphClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const httpPrintLink = new HttpLink({
  uri: "https://api.thegraph.com/subgraphs/name/digitalax/print-library",
});

export const graphPrintClient = new ApolloClient({
  link: httpPrintLink,
  cache: new InMemoryCache(),
});
