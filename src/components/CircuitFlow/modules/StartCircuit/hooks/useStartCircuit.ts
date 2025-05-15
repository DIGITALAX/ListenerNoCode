import { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { generateAuthSig } from "../../../../../../lib/helpers/generateAuthSig";
import { Eip1193Provider, ethers } from "ethers";
import {
  ContractAction,
  LitChainIds,
} from "@/components/CircuitFlow/types/litlistener.types";
import { ModalContext } from "@/pages/_app";

const useStartCircuit = () => {
  const context = useContext(ModalContext);
  const { address } = useAccount();
  const [circuitRunLoading, setCircuitRunLoading] = useState<boolean>(false);

  const handleRunCircuit = async () => {
    if (!context?.circuitInformation?.id) {
      return;
    }
    setCircuitRunLoading(true);
    try {
      if (typeof window !== "undefined" && "ethereum" in window) {
        const web3Provider = new ethers.BrowserProvider(
          window.ethereum as Eip1193Provider
        );

        const connectedSigner = await web3Provider.getSigner();

        const chainId = context?.circuitInformation.actions?.map(
          (action: any) => {
            if ((action as ContractAction).chainId) {
              return (action as ContractAction).chainId;
            } else {
              return null;
            }
          }
        );

        const authSig = await generateAuthSig(
          connectedSigner as ethers.Signer,
          LitChainIds[chainId[0]!]
        );

        const res = await fetch("/api/render/start", {
          method: "POST",
          body: JSON.stringify({
            id: context?.circuitInformation?.id,
            instantiatorAddress: address,
            authSignature: authSig,
            tokenId: context?.signedPKP.tokenId,
            publicKey: context?.signedPKP.publicKey,
            address: context?.signedPKP.address,
          }),
        });

        if (res.status === 200) {
          context?.setCircuitRunning(true);
        } else {
          context?.setGeneralModal({
            open: true,
            message: "Something went wrong starting your Circuit. Try again.",
            image: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
          });

          context?.setCircuitRunning(false);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setCircuitRunLoading(false);
  };

  const handleClearCircuit = () => {
    context?.setCircuitRunning(false);

    context?.setCircuitInformation({
      id: undefined,
      conditions: [],
      conditionalLogic: {
        type: "EVERY",
        interval: 180000000,
      },
      actions: [],
      executionConstraints: {},
      IPFSHash: "",
    });

    context?.setIpfsHash({
      ipfs: "",
      litCode: "",
    });

    context?.setSignedPKP({
      tokenId: "",
      publicKey: "",
      address: "",
    });

    context?.setNewContractActionInfo(undefined);
    context?.setNewFetchActionInfo(undefined);
    context?.setNewContractConditionInfo(undefined);
    context?.setNewWebhookConditionInfo(undefined);
    context?.setCircuitFlow(0);

    context?.setConditionFlow((prev) => ({
      ...prev,
      index: 0,
    }));

    context?.setConditionLogicFlow((prev) => ({
      ...prev,
      index: 0,
    }));

    context?.setActionFlow((prev) => ({ ...prev, index: 0 }));

    context?.setExecutionConstraintFlow((prev) => ({ ...prev, index: 0 }));

    context?.setIpfsFlow((prev) => ({ ...prev, index: 0 }));

    context?.setMintPKPFlow((prev) => ({ ...prev, index: 0 }));

    context?.setRunCircuit((prev) => ({ ...prev, index: 0 }));
  };

  return {
    handleRunCircuit,
    circuitRunLoading,
    handleClearCircuit,
  };
};

export default useStartCircuit;
