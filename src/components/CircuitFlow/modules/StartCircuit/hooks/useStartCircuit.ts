import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { RootState } from "../../../../../../redux/store";
import { setIpfsHash } from "../../../../../../redux/reducers/ipfsHashSlice";
import { setNewContractActionInformation } from "../../../../../../redux/reducers/newContractActionInformationSlice";
import { setNewFetchActionInformation } from "../../../../../../redux/reducers/newFetchActionInformationSlice";
import { setNewContractConditionInformation } from "../../../../../../redux/reducers/newContractConditionInformationSlice";
import { setNewWebhookConditionInformation } from "../../../../../../redux/reducers/newWebhookConditionInformationSlice";
import { useAccount } from "wagmi";
import { generateAuthSig } from "../../../../../../lib/helpers/generateAuthSig";
import { Eip1193Provider, ethers } from "ethers";
import {
  ContractAction,
  LitChainIds,
} from "@/components/CircuitFlow/types/litlistener.types";
import { setSignedPKP } from "../../../../../../redux/reducers/signedPKPSlice";
import { setConditionFlow } from "../../../../../../redux/reducers/conditionFlowSlice";
import { setRunCircuit } from "../../../../../../redux/reducers/runCircuitFlowSlice";
import { setMintPKPFlow } from "../../../../../../redux/reducers/mintPKPFlowSlice";
import { setIpfsFlow } from "../../../../../../redux/reducers/ipfsFlowSlice";
import { setExecutionConstraintFlow } from "../../../../../../redux/reducers/executionConstraintFlowSlice";
import { setActionFlow } from "../../../../../../redux/reducers/actionFlowSlice";
import { setConditionLogicFlow } from "../../../../../../redux/reducers/conditionLogicFlowSlice";
import { setModalOpen } from "../../../../../../redux/reducers/modalOpenSlice";
import { setCircuitFlow } from "../../../../../../redux/reducers/circuitFlowSlice";
import { setCircuitRunning } from "../../../../../../redux/reducers/circuitRunningSlice";

const useStartCircuit = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const signedPKPTx = useSelector(
    (state: RootState) => state.app.signedPKPReducer.value
  );
  const conditionFlowIndex = useSelector(
    (state: RootState) => state.app.conditionFlowReducer.value
  );
  const actionFlowIndex = useSelector(
    (state: RootState) => state.app.actionFlowReducer.value
  );
  const runCircuitFlowIndex = useSelector(
    (state: RootState) => state.app.runCircuitFlowReducer.value
  );
  const conditionLogicFlowIndex = useSelector(
    (state: RootState) => state.app.conditionLogicFlowReducer.value
  );
  const mintPKPFlowIndex = useSelector(
    (state: RootState) => state.app.mintPKPFlowReducer.value
  );
  const ipfsFlowIndex = useSelector(
    (state: RootState) => state.app.ipfsFlowReducer.value
  );
  const executionConstraintFlowIndex = useSelector(
    (state: RootState) => state.app.executionConstraintFlowReducer.value
  );
  const { address } = useAccount();
  const [circuitRunLoading, setCircuitRunLoading] = useState<boolean>(false);

  const handleRunCircuit = async () => {
    if (!circuitInformation?.id) {
      return;
    }
    setCircuitRunLoading(true);
    try {
      if (typeof window !== "undefined" && "ethereum" in window) {
        const web3Provider = new ethers.BrowserProvider(
          window.ethereum as Eip1193Provider
        );

        const connectedSigner = await web3Provider.getSigner();

        const chainId = circuitInformation.actions?.map((action: any) => {
          if ((action as ContractAction).chainId) {
            return (action as ContractAction).chainId;
          } else {
            return null;
          }
        });

        const authSig = await generateAuthSig(
          connectedSigner as ethers.Signer,
          LitChainIds[chainId[0]!]
        );

        const res = await fetch("/api/render/start", {
          method: "POST",
          body: JSON.stringify({
            id: circuitInformation?.id,
            instantiatorAddress: address,
            authSignature: authSig,
            tokenId: signedPKPTx.tokenId,
            publicKey: signedPKPTx.publicKey,
            address: signedPKPTx.address,
          }),
        });

        if (res.status === 200) {
          dispatch(setCircuitRunning(true));
        } else {
          dispatch(
            setModalOpen({
              actionOpen: true,
              actionMessage:
                "Something went wrong starting your Circuit. Try again.",
              actionImage: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
            })
          );
          dispatch(setCircuitRunning(false));
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setCircuitRunLoading(false);
  };

  const handleClearCircuit = () => {
    dispatch(setCircuitRunning(false));
    dispatch(
      setCircuitInformation({
        id: undefined,
        conditions: [],
        conditionalLogic: {
          type: "EVERY",
          interval: 180000000,
        },
        actions: [],
        executionConstraints: {},
        IPFSHash: "",
      })
    );
    dispatch(
      setIpfsHash({
        ipfs: "",
        litCode: "",
      })
    );
    dispatch(
      setSignedPKP({
        tokenId: "",
        publicKey: "",
        address: "",
      })
    );
    dispatch(setNewContractActionInformation(undefined));
    dispatch(setNewFetchActionInformation(undefined));
    dispatch(setNewContractConditionInformation(undefined));
    dispatch(setNewWebhookConditionInformation(undefined));
    dispatch(setCircuitFlow(0));
    dispatch(
      setConditionFlow({
        index: 0,
        contractCount: conditionFlowIndex.contractCount,
        webhookCount: conditionFlowIndex.webhookCount,
      })
    );
    dispatch(
      setConditionLogicFlow({
        index: 0,
        everyCount: conditionLogicFlowIndex.everyCount,
        targetCount: conditionLogicFlowIndex.targetCount,
        thresholdCount: conditionLogicFlowIndex.thresholdCount,
      })
    );
    dispatch(
      setActionFlow({
        index: 0,
        contractCount: actionFlowIndex.contractCount,
        fetchCount: actionFlowIndex.fetchCount,
      })
    );
    dispatch(
      setExecutionConstraintFlow({
        index: 0,
        executionCount: executionConstraintFlowIndex.executionCount,
      })
    );
    dispatch(
      setIpfsFlow({
        index: 0,
        ipfsCount: ipfsFlowIndex.ipfsCount,
      })
    );
    dispatch(
      setMintPKPFlow({
        index: 0,
        mintPKPCount: mintPKPFlowIndex.mintPKPCount,
      })
    );
    dispatch(
      setRunCircuit({
        index: 0,
        circuitCount: runCircuitFlowIndex.circuitCount,
      })
    );
  };

  return {
    handleRunCircuit,
    circuitRunLoading,
    handleClearCircuit,
  };
};

export default useStartCircuit;
