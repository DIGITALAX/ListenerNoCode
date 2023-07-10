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
  handleHashToIPFS,
  ipfsLoading,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <LitAction dispatch={dispatch} litActionCode={litActionCode} />
        <Connector topOnly />
        <HashIPFS
          handleHashToIPFS={handleHashToIPFS}
          ipfsLoading={ipfsLoading}
        />
        <Connector topOnly />
        <ResultIPFS ipfsLoading={ipfsLoading} ipfsHash={ipfsHash} />
        <ConnectorRect />
      </div>
    </div>
  );
};

export default IPFS;
