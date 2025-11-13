import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/8FZk7eyXXrL9cehMUMuQAU9THbhy1476uqnBNCMtCJ1v`,
});

export const graphClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const getPrintUri = () => {
  if (typeof window === "undefined") {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return `${baseUrl}/api/graphql/print`;
  }
  return "/api/graphql/print";
};

const printLink = new HttpLink({
  uri: getPrintUri(),
});

export const graphPrintClient = new ApolloClient({
  link: printLink,

  cache: new InMemoryCache(),
});

const printServerLink = new HttpLink({
  uri: process.env.GRAPH_NODE_URL_PRINT,
});

export const graphPrintServer = new ApolloClient({
  link: printServerLink,
  cache: new InMemoryCache(),
});
