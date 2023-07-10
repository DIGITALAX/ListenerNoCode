import { useState } from "react";

const useStartCircuit = () => {
  const [circuitRunning, setCircuitRunning] = useState<boolean>(false);

  const handleRunCircuit = async () => {
    try {
      setCircuitRunning(true);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return {
    circuitRunning,
    handleRunCircuit
  };
};

export default useStartCircuit;
