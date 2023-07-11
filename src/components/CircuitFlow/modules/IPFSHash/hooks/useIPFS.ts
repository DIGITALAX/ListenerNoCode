import { useEffect, useState } from "react";
import { RootState } from "../../../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setIpfsHash } from "../../../../../../redux/reducers/ipfsHashSlice";
import WebSocketClient from "./../../../../../../utils/WebSocketClient";
import { setPkpTxData } from "../../../../../../redux/reducers/pkpTxDataSlice";
import {
  CHRONICLE_PROVIDER,
  LIT_DB_CONTRACT,
} from "../../../../../../lib/constants";
import { ethers } from "ethers";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { setConnectedSigner } from "../../../../../../redux/reducers/connectedSignerSlice";
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

  const chronicleProvider = new ethers.providers.JsonRpcProvider(
    CHRONICLE_PROVIDER,
    175177
  );

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
      const web3Provider = new ethers.providers.Web3Provider(
        chronicleProvider as any
      );
      const connectedSigner = web3Provider.getSigner();

      dispatch(setConnectedSigner(connectedSigner));

      const res = await fetch("/api/azure/instantiate", {
        method: "POST",
        body: JSON.stringify({
          provider: circuitInformation?.providerURL,
          circuitSigner: connectedSigner,
          contractConditions: circuitInformation.conditions,
          contractActions: circuitInformation.actions,
          conditionalLogic: circuitInformation.conditionalLogic,
          executionConstraints: circuitInformation.executionConstraints,
        }),
      });
      if (res.status === 200) {
        setCallSocket(true);
      }
    } catch (err: any) {
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
      WebSocketClient({
        url: "ws://localhost:3000",
        onMessage: (message) => {
          const data = JSON.parse(message);
          dispatch(
            setCircuitInformation({
              ...circuitInformation,
              id: data?.id,
            })
          );
          dispatch(setIpfsHash(String(data?.ipfs)));
          dispatch(setPkpTxData(data?.txData));
          setCallSocket(false);
        },
      });
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
