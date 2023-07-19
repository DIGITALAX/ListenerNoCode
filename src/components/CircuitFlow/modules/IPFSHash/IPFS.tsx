import { FunctionComponent } from "react";


import LitAction from "./LitAction";
import ResultIPFS from "./ResultIPFS";
import HashIPFS from "./HashIPFS";
import { IPFSProps } from "../../types/circuitflow.types";

const IPFS: FunctionComponent<IPFSProps> = ({
  ipfsHash,
  dispatch,
  litActionCode,
  handleInstantiateCircuit,
  ipfsLoading,
  circuitInformation,
  handleSaveToIPFSDB,
  dbLoading,
  dbAdded
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <LitAction dispatch={dispatch} litActionCode={litActionCode} />
        
        <HashIPFS
          dispatch={dispatch}
          circuitInformation={circuitInformation}
          handleInstantiateCircuit={handleInstantiateCircuit}
          ipfsLoading={ipfsLoading}
        />
        
        <ResultIPFS
        dbAdded={dbAdded}
          dbLoading={dbLoading}
          handleSaveToIPFSDB={handleSaveToIPFSDB}
          ipfsLoading={ipfsLoading}
          ipfsHash={ipfsHash}
        />
      </div>
    </div>
  );
};

export default IPFS;
