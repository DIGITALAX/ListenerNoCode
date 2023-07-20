import { FunctionComponent } from "react";
import { MintGrantBurnProps } from "../../types/circuitflow.types";
import MintPKP from "./MintPKP";

const MintGrantBurn: FunctionComponent<MintGrantBurnProps> = ({
  handleMintGrantBurnPKP,
  pkpLoading,
  signedPKPTx,
}): JSX.Element => {
  return (
    <MintPKP
      handleMintGrantBurnPKP={handleMintGrantBurnPKP}
      pkpLoading={pkpLoading}
      signedPKPTx={signedPKPTx}
    />
  );
};

export default MintGrantBurn;
