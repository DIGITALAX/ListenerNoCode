import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/8FZk7eyXXrL9cehMUMuQAU9THbhy1476uqnBNCMtCJ1v`,
});

export const graphClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const httpPrintLink = new HttpLink({
  uri: `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY_PRINT}/subgraphs/id/5BRsShsfv6tEucvDwGtrstRhg1fpvx2pMRWh5GDovE9K`,
});

export const graphPrintClient = new ApolloClient({
  link: httpPrintLink,
  cache: new InMemoryCache(),
});
