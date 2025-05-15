import { FunctionComponent, useContext } from "react";
import ResultIPFS from "./ResultIPFS";
import HashIPFS from "./HashIPFS";
import { ModalContext } from "@/pages/_app";
import { IPFSProps } from "../../types/circuitflow.types";

const IPFS: FunctionComponent<IPFSProps> = ({
  handleInstantiateCircuit,
  ipfsLoading,
  handleSaveToIPFSDB,
  dbLoading,
  dbAdded,
  switchNeeded,
  serverLoaded,
}): JSX.Element => {
  const context = useContext(ModalContext);
  switch (context?.ipfsFlow?.index) {
    case 1:
      return (
        <ResultIPFS
          dbAdded={dbAdded}
          switchNeeded={switchNeeded}
          dbLoading={dbLoading}
          handleSaveToIPFSDB={handleSaveToIPFSDB}
        />
      );

    default:
      return (
        <HashIPFS
          serverLoaded={serverLoaded}
          handleInstantiateCircuit={handleInstantiateCircuit}
          ipfsLoading={ipfsLoading}
        />
      );
  }
};

export default IPFS;
