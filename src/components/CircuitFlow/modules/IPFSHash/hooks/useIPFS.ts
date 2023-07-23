import { useEffect, useState } from "react";
import { RootState } from "../../../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setIpfsHash } from "../../../../../../redux/reducers/ipfsHashSlice";
import {
  INFURA_GATEWAY,
  LIT_DB_CONTRACT,
} from "../../../../../../lib/constants";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import {
  Action,
  ContractAction,
} from "@/components/CircuitFlow/types/litlistener.types";
import { setModalOpen } from "../../../../../../redux/reducers/modalOpenSlice";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import LitDbAbi from "./../../../../../../abi/LitDbAbi.json";

const useIPFS = () => {
  const dispatch = useDispatch();
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const walletConnected = useSelector(
    (state: RootState) => state.app.walletConnectedReducer.value
  );
  const ipfsHash = useSelector(
    (state: RootState) => state.app.ipfsHashReducer.value
  );
  const [switchNeeded, setSwitchNeeded] = useState<boolean>(false);
  const [ipfsLoading, setIpfsLoading] = useState<boolean>(false);
  const [dbLoading, setDbLoading] = useState<boolean>(false);
  const [dbAdded, setDBAdded] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    address: LIT_DB_CONTRACT,
    abi: LitDbAbi,
    args: [
      circuitInformation?.id?.replace(/-/g, ""),
      `ipfs://${ipfsHash.ipfs}`,
    ],
    functionName: "addEntryToDB",
    enabled: Boolean(ipfsHash.ipfs !== ""),
  });

  const { writeAsync } = useContractWrite(config as any);

  const handleInstantiateCircuit = async () => {
    if (
      circuitInformation?.actions?.length > 1 &&
      circuitInformation?.actions.some(
        (obj: Action) => (obj as ContractAction).chainId !== undefined
      ) &&
      (!circuitInformation?.providerURL ||
        circuitInformation?.providerURL === "")
    ) {
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "You must set a Provider URL with Contract Actions.",
          actionImage: "QmaLbRzzCP1axGEd6vJsDs7Jm7hyyiBGYsnBfv3jW51KiX",
        })
      );
    }

    setIpfsLoading(true);
    try {
      const res = await fetch("/api/azure/instantiate", {
        method: "POST",
        body: JSON.stringify({
          circuitConditions: circuitInformation.conditions,
          circuitActions: circuitInformation.actions,
          conditionalLogic: circuitInformation.conditionalLogic,
          executionConstraints: circuitInformation.executionConstraints,
          instantiatorAddress: address,
        }),
      });
      if (res.status === 200) {
        setIpfsLoading(false);
      } else if (res.status === 500) {
        dispatch(
          setModalOpen({
            actionOpen: true,
            actionMessage:
              "There was an error instantiating your circuit. Try Again.",
            actionImage: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
          })
        );
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
      const tx = await writeAsync?.();
      const res = await waitForTransaction({
        hash: tx?.hash!,
      });
      if (res.status === "success") {
        setDBAdded(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDbLoading(false);
  };

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:3000");

    websocket.addEventListener("open", () => {
      console.log("WebSocket connection is open");
    });

    websocket.addEventListener("message", async (event) => {
      const message = event.data;
      console.log("Received message from server:", message);

      const data = JSON.parse(message);

      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          id: data?.id,
        })
      );
      const res = await fetch(`${INFURA_GATEWAY}/ipfs/${data?.ipfs}`);
      if (res) {
        const litActionCode = await res.text();
        dispatch(
          setIpfsHash({
            ipfs: String(data?.ipfs || ""),
            litCode: litActionCode || "",
          })
        );
      }
    });

    websocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      websocket.close();
    };
  }, []);

  useEffect(() => {
    setSwitchNeeded(chain?.id !== 137 ? true : false);
  }, [isConnected, walletConnected, chain?.id]);

  return {
    ipfsLoading,
    handleInstantiateCircuit,
    handleSaveToIPFSDB,
    dbLoading,
    dbAdded,
    switchNeeded,
  };
};

export default useIPFS;
