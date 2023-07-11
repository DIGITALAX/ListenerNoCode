import { FunctionComponent } from "react";
import Connector from "../Common/Connector";
import ConnectorRect from "../Common/ConnectorRect";
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
        <Connector topOnly />
        <HashIPFS
          dispatch={dispatch}
          circuitInformation={circuitInformation}
          handleInstantiateCircuit={handleInstantiateCircuit}
          ipfsLoading={ipfsLoading}
        />
        <Connector topOnly />
        <ResultIPFS
        dbAdded={dbAdded}
          dbLoading={dbLoading}
          handleSaveToIPFSDB={handleSaveToIPFSDB}
          ipfsLoading={ipfsLoading}
          ipfsHash={ipfsHash}
        />
        <ConnectorRect />
      </div>
    </div>
  );
};

export default IPFS;
