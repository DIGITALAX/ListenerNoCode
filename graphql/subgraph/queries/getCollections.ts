import { gql } from "@apollo/client";
import { graphPrintClient } from "../../../lib/subgraph/client";

const COLLECTIONS = `
query {
  collectionCreateds(where: {origin: 2}) {
    amount
    metadata {
      access
      visibility
      video
      title
      tags
      sex
      onChromadin
      style
      prompt
      sizes
      microbrand
      mediaTypes
      mediaCover
      id
      description
      audio
      colors
      images
      microbrandCover
    }
    postId
    acceptedTokens
    uri
    printType
    price
    designer
    tokenIdsMinted
    collectionId
    unlimited
    origin
  }
}
`;

export const getAllCollections = async (): Promise<any> => {
  const queryPromise = graphPrintClient.query({
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
