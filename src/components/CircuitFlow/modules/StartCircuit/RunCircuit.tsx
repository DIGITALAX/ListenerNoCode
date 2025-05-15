import { FunctionComponent, useContext } from "react";

import CircuitStart from "./CircuitStart";
import ViewInAccount from "./ViewInAccount";
import { ModalContext } from "@/pages/_app";
import { RunCircuitProps } from "../../types/circuitflow.types";

const RunCircuit: FunctionComponent<RunCircuitProps> = ({
  handleRunCircuit,
  circuitRunLoading,
  handleClearCircuit,
}): JSX.Element => {
  const context = useContext(ModalContext)
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {context?.circuitRunning ? (
        <ViewInAccount
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
