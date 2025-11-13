import { gql } from "@apollo/client";
import {
  graphPrintClient,
  graphPrintServer,
} from "../../../lib/subgraph/client";

const ORDERS = `
query($buyer: String!) {
  orderCreateds(where: {buyer: $buyer, origin: 2}) {
       orderId
      totalPrice
      currency
      postId
      blockNumber
      buyer
      blockTimestamp
      transactionHash
      collection {
      price
      amount
      collectionId
        metadata {
          images
          title
        }
      }
      messages
      details
       isFulfilled
      status
  }
}
`;

export const getOrders = async (buyer: string): Promise<any> => {
  const queryPromise = (
    typeof window === "undefined" ? graphPrintServer : graphPrintClient
  ).query({
    query: gql(ORDERS),
    variables: {
      buyer,
    },
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
