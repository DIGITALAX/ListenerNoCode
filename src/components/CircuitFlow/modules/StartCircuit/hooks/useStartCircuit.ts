import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { RootState } from "../../../../../../redux/store";
import { setIpfsHash } from "../../../../../../redux/reducers/ipfsHashSlice";
import { setPkpTxData } from "../../../../../../redux/reducers/pkpTxDataSlice";
import { setLitActionCode } from "../../../../../../redux/reducers/litActionCodeSlice";
import { setNewContractActionInformation } from "../../../../../../redux/reducers/newContractActionInformationSlice";
import { setNewFetchActionInformation } from "../../../../../../redux/reducers/newFetchActionInformationSlice";
import { setNewContractConditionInformation } from "../../../../../../redux/reducers/newContractConditionInformationSlice";
import { setNewWebhookConditionInformation } from "../../../../../../redux/reducers/newWebhookConditionInformationSlice";
import { useAccount, useNetwork } from "wagmi";
import { generateAuthSig } from "../../../../../../lib/helpers/generateAuthSig";
import ethers from "ethers";

const useStartCircuit = () => {
  const dispatch = useDispatch();
  const { chain } = useNetwork();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const signedPKPTx = useSelector(
    (state: RootState) => state.app.signedPKPReducer.value
  );
  const connectedSigner = useSelector(
    (state: RootState) => state.app.connectedSignerReducer.value
  );
  const { address } = useAccount();
  const [circuitRunning, setCircuitRunning] = useState<boolean>(false);
  const [circuitRunLoading, setCircuitRunLoading] = useState<boolean>(false);

  const handleRunCircuit = async () => {
    if (!circuitInformation?.id) {
      return;
    }
    setCircuitRunLoading(true);
    try {
      const authSig = await generateAuthSig(
        connectedSigner as ethers.Signer,
        chain?.id
      );

      const res = await fetch("/api/azure/start", {
        method: "POST",
        body: JSON.stringify({
          id: circuitInformation?.id,
          instantiatorAddress: address,
          authSignature: authSig,
          signedPKPTransactionData: signedPKPTx,
        }),
      });

      if (res.status === 200) {
        setCircuitRunning(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setCircuitRunLoading(false);
  };

  const handleClearCircuit = () => {
    setCircuitRunning(false);
    dispatch(
      setCircuitInformation({
        id: undefined,
        conditions: [],
        conditionalLogic: {
          type: "EVERY",
          interval: 120000,
        },
        actions: [],
        executionConstraints: {},
        IPFSHash: "",
        PKP: {
          address: `0x`,
          publicKey: `0x04`,
        },
      })
    );
    dispatch(setIpfsHash(""));
    dispatch(setPkpTxData(undefined));
    dispatch(setLitActionCode(""));
    dispatch(setNewContractActionInformation(undefined));
    dispatch(setNewFetchActionInformation(undefined));
    dispatch(setNewContractConditionInformation(undefined));
    dispatch(setNewWebhookConditionInformation(undefined));
  };

  return {
    circuitRunning,
    handleRunCircuit,
    circuitRunLoading,
    handleClearCircuit,
  };
};

export default useStartCircuit;
