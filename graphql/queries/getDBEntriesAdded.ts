import { gql } from "@apollo/client";
import { graphClient } from "../../lib/subgraph/client";

const CIRCUITS_INTERRUPTED = `
  query {
    dbentryAddeds(orderDirection: desc) {
        circuitId
        stringifiedLogs
        blockTimestamp
        transactionHash
      }
  }
`;

export const getDBEntriesAdded = async (): Promise<any> => {
  const queryPromise = graphClient.query({
    query: gql(CIRCUITS_INTERRUPTED),

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
