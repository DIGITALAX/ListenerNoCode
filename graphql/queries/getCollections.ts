import { gql } from "@apollo/client";
import { graphClient } from "../../lib/subgraph/client";

const COLLECTIONS = `
  query {
    collectionCreateds {
      collectionId
      owner
      prices
      soldTokens
      tokenIds
      uri
      blockTimestamp
      amount
      fulfillerAddress
      fulfillerId
    }
  }
`;

export const getAllCollections = async (): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(COLLECTIONS),

    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ timedOut: true });
    }, 60000); // 1 minute timeout
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);
  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};
