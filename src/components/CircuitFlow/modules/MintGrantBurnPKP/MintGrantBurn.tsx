import { FunctionComponent } from "react";

import { MintGrantBurnProps } from "../../types/circuitflow.types";
import MintPKP from "./MintPKP";
import PKPResult from "./PKPResult";


const MintGrantBurn: FunctionComponent<MintGrantBurnProps> = ({
  handleMintGrantBurnPKP,
  pkpLoading,
  signedPKPTx
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <MintPKP
          handleMintGrantBurnPKP={handleMintGrantBurnPKP}
          pkpLoading={pkpLoading}
        />
        
        <PKPResult signedPKPTx={signedPKPTx} />
        
      </div>
    </div>
  );
};

export default MintGrantBurn;
