import { FunctionComponent } from "react";
import Connector from "../Common/Connector";
import { MintGrantBurnProps } from "../../types/circuitflow.types";
import MintPKP from "./MintPKP";
import PKPResult from "./PKPResult";
import ConnectorRect from "../Common/ConnectorRect";

const MintGrantBurn: FunctionComponent<MintGrantBurnProps> = ({
  handleMintGrantBurnPKP,
  pkpLoading,
  circuitInformation,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <MintPKP
          handleMintGrantBurnPKP={handleMintGrantBurnPKP}
          pkpLoading={pkpLoading}
        />
        <Connector topOnly />
        <PKPResult circuitInformation={circuitInformation} />
        <Connector topOnly />
        <ConnectorRect />
      </div>
    </div>
  );
};

export default MintGrantBurn;
