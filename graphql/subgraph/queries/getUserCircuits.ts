import { gql } from "@apollo/client";
import { graphClient } from "../../../lib/subgraph/client";

const CIRCUITS_USER = `
query($listenerDBContract: String, $instantiatorAddress: String) {
  circuitAddeds(where: {listenerDBContract: $listenerDBContract, instantiatorAddress: $instantiatorAddress},orderBy: blockTimestamp, orderDirection: desc) {
    circuitId
    blockTimestamp
    circuitInformation
  }
}
`;

const CIRCUIT_USER_ID = `
query($listenerDBContract: String, $instantiatorAddress: String) {
  circuitAddeds(where: {listenerDBContract: $listenerDBContract, instantiatorAddress: $instantiatorAddress},orderBy: blockTimestamp, orderDirection: desc) {
    instantiatorAddress
    listenerDBContract
    transactionHash
    circuitInformation
    circuitId
    blockTimestamp
    blockNumber
  }
}
`;

export const getUserCircuitsUser = async (
  instantiatorAddress: string
): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(CIRCUITS_USER),
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

export const getUserCircuitsUserById = async (
  instantiatorAddress: string
): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(CIRCUIT_USER_ID),
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
