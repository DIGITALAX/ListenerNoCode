import { useContext, useEffect, useState } from "react";
import {
  INFURA_GATEWAY,
  LIT_DB_CONTRACT,
} from "../../../../../../lib/constants";
import {
  Action,
  ContractAction,
} from "@/components/CircuitFlow/types/litlistener.types";
import { useAccount } from "wagmi";
import { http } from "@wagmi/core";
import LitDbAbi from "./../../../../../../abi/LitDbAbi.json";
import { chronicle, ModalContext } from "@/pages/_app";
import { createPublicClient, createWalletClient, custom } from "viem";
import { polygon } from "viem/chains";

const useIPFS = () => {
  const context = useContext(ModalContext);
  const { isConnected, address, chainId } = useAccount();
  const [switchNeeded, setSwitchNeeded] = useState<boolean>(false);
  const [serverLoaded, setServerLoaded] = useState<boolean>(false);
  const [ipfsLoading, setIpfsLoading] = useState<boolean>(false);
  const [dbLoading, setDbLoading] = useState<boolean>(false);
  const [dbAdded, setDBAdded] = useState<boolean>(false);
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  });

  const handleInstantiateCircuit = async () => {
    if (
      Number(context?.circuitInformation?.actions?.length) > 1 &&
      context?.circuitInformation?.actions.some(
        (obj: Action) => (obj as ContractAction).chainId !== undefined
      ) &&
      (!context?.circuitInformation?.providerURL ||
        context?.circuitInformation?.providerURL === "")
    ) {
      context?.setGeneralModal({
        open: true,
        message: "You must set a Provider URL with Contract Actions.",
        image: "QmaLbRzzCP1axGEd6vJsDs7Jm7hyyiBGYsnBfv3jW51KiX",
      });
    }

    setIpfsLoading(true);
    try {
      const res = await fetch("/api/render/instantiate", {
        method: "POST",
        body: JSON.stringify({
          circuitConditions: context?.circuitInformation.conditions,
          circuitActions: context?.circuitInformation.actions,
          conditionalLogic: context?.circuitInformation.conditionalLogic,
          executionConstraints:
            context?.circuitInformation.executionConstraints,
          instantiatorAddress: address,
        }),
      });
      if (res.status === 200) {
        setIpfsLoading(false);
      } else if (res.status === 500) {
        context?.setGeneralModal({
          open: true,
          message: "There was an error instantiating your circuit. Try Again.",
          image: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
        });
      }
    } catch (err: any) {
      setIpfsLoading(false);
      console.error(err.message);
    }
    setIpfsLoading(false);
  };

  const handleSaveToIPFSDB = async () => {
    setDbLoading(true);
    try {
      const clientWallet = createWalletClient({
        chain: chronicle,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: LIT_DB_CONTRACT,
        abi: LitDbAbi,
        args: [
          context?.circuitInformation?.id?.replace(/-/g, ""),
          `ipfs://${context?.ipfsHash.ipfs}`,
        ],
        functionName: "addEntryToDB",
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      const tx = await publicClient.waitForTransactionReceipt({ hash: res });

      if (tx.status === "success") {
        setDBAdded(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDbLoading(false);
  };

  useEffect(() => {
    fetch("/api/render/ping")
      .then((response) => {
        response.json();
        setServerLoaded(true);
      })
      .then(() => {
        const websocket = new WebSocket("wss://litlistener.onrender.com");

        websocket.addEventListener("open", () => {
          console.log("WebSocket connection is open");
        });

        websocket.addEventListener("message", async (event) => {
          const message = event.data;
          console.log("Received message from server:", message);

          const data = JSON.parse(message);

          context?.setCircuitInformation((prev) => ({
            ...prev,
            id: data?.id,
          }));

          const res = await fetch(`${INFURA_GATEWAY}/ipfs/${data?.ipfs}`);
          if (res) {
            const litActionCode = await res.text();
            context?.setIpfsHash({
              ipfs: String(data?.ipfs || ""),
              litCode: litActionCode || "",
            });
          }
        });

        websocket.addEventListener("close", () => {
          console.log("WebSocket connection closed");
        });

        return () => {
          websocket.close();
        };
      });
  }, []);

  useEffect(() => {
    setSwitchNeeded(chainId !== 137 ? true : false);
  }, [isConnected, chainId]);

  return {
    ipfsLoading,
    handleInstantiateCircuit,
    handleSaveToIPFSDB,
    dbLoading,
    dbAdded,
    switchNeeded,
    serverLoaded,
  };
};

export default useIPFS;
