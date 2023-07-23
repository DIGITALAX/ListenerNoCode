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
  switchNeeded,
  openChainModal,
  address,
  openConnectModal
}): JSX.Element => {
  switch (ipfsFlowIndex.index) {
    case 1:
      return (
        <ResultIPFS
          dbAdded={dbAdded}
          switchNeeded={switchNeeded}
          openChainModal={openChainModal}
          dbLoading={dbLoading}
          handleSaveToIPFSDB={handleSaveToIPFSDB}
        />
      );

    default:
      return (
        <HashIPFS
          handleInstantiateCircuit={handleInstantiateCircuit}
          ipfsLoading={ipfsLoading}
          ipfsHash={ipfsHash || ""}
          litActionCode={litActionCode}
          address={address}
          openConnectModal={openConnectModal}
        />
      );
  }
};

export default IPFS;
