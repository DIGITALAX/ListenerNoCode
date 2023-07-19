import { FunctionComponent } from "react";
import CircuitInput from "./CircuitInputs";

import CircuitStart from "./CircuitStart";
import ViewInAccount from "./ViewInAccount";
import { RunCircuitProps } from "../../types/circuitflow.types";

const RunCircuit: FunctionComponent<RunCircuitProps> = ({
  handleRunCircuit,
  circuitRunning,
  circuitRunLoading,
  ipfsHash,
  handleClearCircuit,
  signedPKPTx,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <CircuitInput ipfsHash={ipfsHash} signedPKPTx={signedPKPTx} />
        
        <CircuitStart
          handleRunCircuit={handleRunCircuit}
          circuitRunning={circuitRunning}
          circuitRunLoading={circuitRunLoading}
        />
        
        <ViewInAccount
          circuitRunning={circuitRunning}
          handleClearCircuit={handleClearCircuit}
        />
      </div>
    </div>
  );
};

export default RunCircuit;
