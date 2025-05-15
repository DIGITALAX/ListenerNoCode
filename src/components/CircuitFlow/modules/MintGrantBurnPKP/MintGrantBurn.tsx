import { FunctionComponent } from "react";
import MintPKP from "./MintPKP";
import { MintGrantBurnProps } from "../../types/circuitflow.types";

const MintGrantBurn: FunctionComponent<MintGrantBurnProps> = ({
  handleMintGrantBurnPKP,
  pkpLoading,
  switchNeededPKP,
}): JSX.Element => {
  return (
    <MintPKP
      handleMintGrantBurnPKP={handleMintGrantBurnPKP}
      pkpLoading={pkpLoading}
      switchNeededPKP={switchNeededPKP}
    />
  );
};

export default MintGrantBurn;
