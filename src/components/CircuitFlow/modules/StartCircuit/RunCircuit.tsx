import { FunctionComponent } from "react";

import CircuitStart from "./CircuitStart";
import ViewInAccount from "./ViewInAccount";
import { RunCircuitProps } from "../../types/circuitflow.types";

const RunCircuit: FunctionComponent<RunCircuitProps> = ({
  handleRunCircuit,
  circuitRunning,
  circuitRunLoading,
  handleClearCircuit,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {circuitRunning ? (
        <ViewInAccount
          circuitRunning={circuitRunning}
          handleClearCircuit={handleClearCircuit}
        />
      ) : (
        <CircuitStart
          handleRunCircuit={handleRunCircuit}
          circuitRunLoading={circuitRunLoading}
        />
      )}
    </div>
  );
};

export default RunCircuit;
