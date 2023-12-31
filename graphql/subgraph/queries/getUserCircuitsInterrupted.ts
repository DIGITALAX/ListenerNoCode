import { gql } from "@apollo/client";
import { graphClient } from "../../../lib/subgraph/client";

const CIRCUITS_INTERRUPTED = `
  query($listenerDBContract: String, $instantiatorAddress: String) {
    circuitInterrupteds(where: {listenerDBContract: $listenerDBContract, instantiatorAddress: $instantiatorAddress},orderBy: blockTimestamp, orderDirection: desc) {
        circuitId
        hashedId
      }
  }
`;

const CIRCUIT_INTERRUPTED_ID = `
  query($listenerDBContract: String, $instantiatorAddress: String) {
    circuitInterrupteds(where: {listenerDBContract: $listenerDBContract, instantiatorAddress: $instantiatorAddress}, orderBy: blockTimestamp, orderDirection: desc) {
        circuitId
        hashedId
        instantiatorAddress
        listenerDBContract
        transactionHash
        blockTimestamp
        blockNumber
      }
  }
`;

export const getUserCircuitsInterrupted = async (
  instantiatorAddress: string
): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(CIRCUITS_INTERRUPTED),
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

export const getUserCircuitsInterruptedById = async (
  instantiatorAddress: string
): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(CIRCUIT_INTERRUPTED_ID),
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
