import { NextApiRequest, NextApiResponse } from "next";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

const serverPrintClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPH_NODE_URL_PRINT,
  }),
  cache: new InMemoryCache(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query, variables } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const result = await serverPrintClient.query({
      query: gql(query),
      variables: variables || {},
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || "GraphQL query failed" });
  }
}