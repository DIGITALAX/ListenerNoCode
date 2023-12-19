import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../lib/lens/client";
import {
  LensTransactionStatusRequest,
  LensTransactionStatusQuery,
  LensTransactionStatusDocument,
  LensTransactionStatusType,
} from "../../generated";
import { AnyAction, Dispatch } from "redux";
import { setModalOpen } from "../../../redux/reducers/modalOpenSlice";

const handleIndexCheck = async (
  tx: LensTransactionStatusRequest,
  dispatch: Dispatch<AnyAction>
) => {
  const indexedStatus = await pollUntilIndexed(tx);
  if (!indexedStatus) {
    dispatch(
      setModalOpen({
        actionOpen: true,
        actionMessage:
          "There was an error completing your purchase. Try Again?",
        actionImage: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
      })
    );
  }
};

export const getIndexed = async (
  request: LensTransactionStatusRequest
): Promise<FetchResult<LensTransactionStatusQuery>> => {
  return await apolloClient.query({
    query: LensTransactionStatusDocument,
    variables: {
      request: request,
    },
    fetchPolicy: "no-cache",
  });
};

const pollUntilIndexed = async (
  request: LensTransactionStatusRequest
): Promise<boolean> => {
  let count = 0;
  while (count < 10) {
    try {
      const { data } = await getIndexed(request);
      if (data && data.lensTransactionStatus) {
        switch (data.lensTransactionStatus.status) {
          case LensTransactionStatusType.Failed:
            return false;
          case LensTransactionStatusType.OptimisticallyUpdated:
          case LensTransactionStatusType.Complete:
            return true;
          case LensTransactionStatusType.Processing:
            count += 1;
            await new Promise((resolve) => setTimeout(resolve, 6000));
            if (count == 10) return true;
            break;
          default:
            throw new Error("Unexpected status");
        }
      }
    } catch (err: any) {
      count += 1;
      console.error(err.message);
      continue;
    }
  }
  return false;
};

export default handleIndexCheck;
