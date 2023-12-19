import { gql } from "@apollo/client";
import { graphClient } from "../../../lib/subgraph/client";

const CIRCUITS_COMPLETED = `
  query($listenerDBContract: String, $instantiatorAddress: String) {
    circuitCompleteds(where: {listenerDBContract: $listenerDBContract, instantiatorAddress: $instantiatorAddress},orderBy: blockTimestamp, orderDirection: desc) {
      circuitId
      hashedId
    }
  }
`;

const CIRCUIT_COMPLETED_ID = `query($listenerDBContract: String, $instantiatorAddress: String) {
  circuitCompleteds(where: {listenerDBContract: $listenerDBContract, instantiatorAddress: $instantiatorAddress},orderBy: blockTimestamp, orderDirection: desc) {
    blockTimestamp
    circuitId
    hashedId
    instantiatorAddress
    listenerDBContract
    transactionHash
    blockNumber
  }
}`;

export const getUserCircuitsCompleted = async (
  instantiatorAddress: string
): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(CIRCUITS_COMPLETED),
    variables: {
      listenerDBContract: "0x94adbd035e5bc2959d9279143601a3686c1c3498",
      instantiatorAddress,
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

export const getUserCircuitsCompletedById = async (
  instantiatorAddress: string
): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(CIRCUIT_COMPLETED_ID),
    variables: {
      listenerDBContract: "0x94adbd035e5bc2959d9279143601a3686c1c3498",
      instantiatorAddress,
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
