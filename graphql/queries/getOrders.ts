import { gql } from "@apollo/client";
import { graphClient } from "../../lib/subgraph/client";

const ORDERS = `
  query($buyerAddress: String) {
    orderCreateds(where: {buyer: $buyerAddress},orderBy: blockTimestamp, orderDirection: desc) {
        orderIds
        totalPrice
        transactionHash
        fulfillmentInformation
        buyer
        blockTimestamp
        isFulfilled
        orderStatus
        orderStatusTimestamps
        blockNumber
        chosenAddress
        collectionIds
    }
  }
`;

const ORDERS_ID = `
  query($buyerAddress: String, $transactionHash: String) {
    orderCreateds(where: {buyer: $buyerAddress, transactionHash: $transactionHash},orderBy: blockTimestamp, orderDirection: desc) {
        orderIds
        totalPrice
        transactionHash
        fulfillmentInformation
        buyer
        blockTimestamp
        isFulfilled
        orderStatus
        orderStatusTimestamps
        blockNumber
        chosenAddress
        collectionIds
    }
  }
`;

export const getOrders = async (buyerAddress: string): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(ORDERS),
    variables: {
      buyerAddress,
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

export const getOrderInformation = async (
  buyerAddress: string,
  transactionHash: string
): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(ORDERS_ID),
    variables: {
      buyerAddress,
      transactionHash,
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
