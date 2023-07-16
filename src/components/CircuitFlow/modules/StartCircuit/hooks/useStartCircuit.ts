import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { RootState } from "../../../../../../redux/store";
import { setIpfsHash } from "../../../../../../redux/reducers/ipfsHashSlice";
import { setLitActionCode } from "../../../../../../redux/reducers/litActionCodeSlice";
import { setNewContractActionInformation } from "../../../../../../redux/reducers/newContractActionInformationSlice";
import { setNewFetchActionInformation } from "../../../../../../redux/reducers/newFetchActionInformationSlice";
import { setNewContractConditionInformation } from "../../../../../../redux/reducers/newContractConditionInformationSlice";
import { setNewWebhookConditionInformation } from "../../../../../../redux/reducers/newWebhookConditionInformationSlice";
import { useAccount, useSignMessage } from "wagmi";
import { generateAuthSig } from "../../../../../../lib/helpers/generateAuthSig";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
import {
  ContractAction,
  LitChainIds,
} from "@/components/CircuitFlow/types/litlistener.types";

const useStartCircuit = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const signedPKPTx = useSelector(
    (state: RootState) => state.app.signedPKPReducer.value
  );
  const { address } = useAccount();
  const [circuitRunning, setCircuitRunning] = useState<boolean>(false);
  const [circuitRunLoading, setCircuitRunLoading] = useState<boolean>(false);

  const siweMessage = new SiweMessage({
    domain: "localhost",
    address: address,
    statement: "This is an Auth Sig for LitListenerSDK",
    uri: "https://localhost/login",
    version: "1",
    chainId: 137,
  });
  const signedMessage = siweMessage.prepareMessage();

  const { data, isError, isLoading, isSuccess, signMessageAsync } =
    useSignMessage({
      message: signedMessage,
    });

  const handleRunCircuit = async () => {
    if (!circuitInformation?.id) {
      return;
    }
    setCircuitRunLoading(true);
    try {
      const sig = await signMessageAsync();
      const res = await fetch("/api/azure/connect", {
        method: "POST",
        body: JSON.stringify({
          globalAuthSignature: {
            sig,
            derivedVia: "web3.eth.personal.sign",
            signedMessage,
            address,
          },
        }),
      });

      if (typeof window !== "undefined" && "ethereum" in window) {
        const web3Provider = new ethers.providers.Web3Provider(
          window.ethereum!
        );
        const connectedSigner = web3Provider.getSigner();

        const chainId = circuitInformation.actions.map((action: any) => {
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

        const res = await fetch("/api/azure/start", {
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

        console.log(await res.json())

        if (res.status === 200) {
          setCircuitRunning(true);
        }
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
      })
    );
    dispatch(setIpfsHash(""));
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
