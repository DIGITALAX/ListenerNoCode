import { gql } from "@apollo/client";
import { graphClient } from "../../../lib/subgraph/client";

const LOGS_ADDED = `
  query($listenerDBContract: String, $instantiatorAddress: String) {
    logAddeds(where: {listenerDBContract: $listenerDBContract, instantiatorAddress: $instantiatorAddress},orderBy: blockTimestamp, orderDirection: desc) {
        stringifiedLogs
        circuitId
        hashedId
        listenerDBContract
        blockTimestamp
        blockNumber
        instantiatorAddress
        transactionHash
      }
  }
`;

export const getUserLogs = async (
  instantiatorAddress: string
): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(LOGS_ADDED),
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
