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
    <div className="relative w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-row items-center justify-center gap-4">
        <CircuitStart
          handleRunCircuit={handleRunCircuit}
          circuitRunning={circuitRunning}
          circuitRunLoading={circuitRunLoading}
        />
        {circuitRunning && (
          <ViewInAccount
            circuitRunning={circuitRunning}
            handleClearCircuit={handleClearCircuit}
          />
        )}
      </div>
    </div>
  );
};

export default RunCircuit;
