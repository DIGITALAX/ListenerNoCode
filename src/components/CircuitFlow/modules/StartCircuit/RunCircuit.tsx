import { FunctionComponent } from "react";
import CircuitInput from "./CircuitInputs";
import Connector from "../Common/Connector";
import CircuitStart from "./CircuitStart";
import ViewInAccount from "./ViewInAccount";
import { RunCircuitProps } from "../../types/circuitflow.types";

const RunCircuit: FunctionComponent<RunCircuitProps> = ({
  handleRunCircuit,
  circuitRunning,
  circuitInformation,
  ipfsHash,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <CircuitInput
          circuitInformation={circuitInformation}
          ipfsHash={ipfsHash}
        />
        <Connector topOnly />
        <CircuitStart
          handleRunCircuit={handleRunCircuit}
          circuitRunning={circuitRunning}
        />
        <Connector topOnly />
        <ViewInAccount circuitRunning={circuitRunning} />
      </div>
    </div>
  );
};

export default RunCircuit;
