import { useEffect, useState } from "react";
import { RootState } from "../../../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setIpfsHash } from "../../../../../../redux/reducers/ipfsHashSlice";
import {
  LIT_DB_CONTRACT,
} from "../../../../../../lib/constants";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import {
  Action,
  ContractAction,
} from "@/components/CircuitFlow/types/litlistener.types";
import { setModalOpen } from "../../../../../../redux/reducers/modalOpenSlice";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import LitDbAbi from "./../../../../../../abi/LitDbAbi.json";

const useIPFS = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const ipfsHash = useSelector(
    (state: RootState) => state.app.ipfsHashReducer.value
  );
  const [ipfsLoading, setIpfsLoading] = useState<boolean>(false);
  const [callSocket, setCallSocket] = useState<boolean>(false);
  const [dbLoading, setDbLoading] = useState<boolean>(false);
  const [dbAdded, setDBAdded] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    address: LIT_DB_CONTRACT,
    abi: LitDbAbi,
    args: [circuitInformation?.id, ipfsHash],
    functionName: "addEntryToDB",
    enabled: Boolean(ipfsHash !== ""),
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
          provider: circuitInformation?.providerURL,
          contractConditions: circuitInformation.conditions,
          contractActions: circuitInformation.actions,
          conditionalLogic: circuitInformation.conditionalLogic,
          executionConstraints: circuitInformation.executionConstraints,
        }),
      });
      if (res.status === 200) {
        setIpfsLoading(false);
        setCallSocket(true);
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
    if (ipfsLoading && callSocket) {
      const websocket = new WebSocket("ws://localhost:3001");

      websocket.addEventListener("open", () => {
        console.log("WebSocket connection is open");
      });

      websocket.addEventListener("message", (event) => {
        const message = event.data;
        console.log("Received message from server:", message);

        const data = JSON.parse(message);
        dispatch(
          setCircuitInformation({
            ...circuitInformation,
            id: data?.id,
          })
        );
        dispatch(setIpfsHash(String(data?.ipfs)));
        setCallSocket(false);
      });

      websocket.addEventListener("close", () => {
        console.log("WebSocket connection closed");
      });

      return () => {
        websocket.close();
      };
    }
  }, [ipfsLoading, callSocket]);

  return {
    ipfsLoading,
    handleInstantiateCircuit,
    handleSaveToIPFSDB,
    dbLoading,
    dbAdded,
  };
};

export default useIPFS;
