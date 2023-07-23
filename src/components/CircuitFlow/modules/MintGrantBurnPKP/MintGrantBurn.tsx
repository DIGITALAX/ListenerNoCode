import { FunctionComponent } from "react";
import { MintGrantBurnProps } from "../../types/circuitflow.types";
import MintPKP from "./MintPKP";

const MintGrantBurn: FunctionComponent<MintGrantBurnProps> = ({
  handleMintGrantBurnPKP,
  pkpLoading,
  signedPKPTx,
  switchNeededPKP,
  openChainModal,
}): JSX.Element => {
  return (
    <MintPKP
      handleMintGrantBurnPKP={handleMintGrantBurnPKP}
      pkpLoading={pkpLoading}
      signedPKPTx={signedPKPTx}
      openChainModal={openChainModal}
      switchNeededPKP={switchNeededPKP}
    />
  );
};

export default MintGrantBurn;
