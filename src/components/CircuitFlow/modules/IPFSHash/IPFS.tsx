import { FunctionComponent } from "react";
import ResultIPFS from "./ResultIPFS";
import HashIPFS from "./HashIPFS";
import { IPFSProps } from "../../types/circuitflow.types";

const IPFS: FunctionComponent<IPFSProps> = ({
  ipfsHash,
  handleInstantiateCircuit,
  ipfsLoading,
  handleSaveToIPFSDB,
  dbLoading,
  dbAdded,
  litActionCode,
  ipfsFlowIndex,
}): JSX.Element => {
  switch (ipfsFlowIndex.index) {
    case 1:
      return (
        <ResultIPFS
          dbAdded={dbAdded}
          dbLoading={dbLoading}
          handleSaveToIPFSDB={handleSaveToIPFSDB}
        />
      );

    default:
      return (
        <HashIPFS
          handleInstantiateCircuit={handleInstantiateCircuit}
          ipfsLoading={ipfsLoading}
          ipfsHash={ipfsHash}
          litActionCode={litActionCode}
        />
      );
  }
};

export default IPFS;
