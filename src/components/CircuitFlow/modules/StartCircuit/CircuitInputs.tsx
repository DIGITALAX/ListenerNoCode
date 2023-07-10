import { FunctionComponent } from "react";
import { CircuitInputProps } from "../../types/circuitflow.types";
import Input from "../Common/Input";

const CircuitInput: FunctionComponent<CircuitInputProps> = ({
  circuitInformation,
  ipfsHash,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <Input text={"Check your Circuit public key & IPFS hash."} />
      <div
        className={`flex flex-col w-full h-full border-4 border-moda p-1 gap-4 items-start justify-start font-vcr text-white overflow-y-scroll`}
      >
        <div className="relative w-full h-fit gap-1 flex flex-col">
          <div
            className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
            id="blur"
          >
            Public Key
          </div>
          <div
            className="bg-aBlack w-full h-fit break-all p-1 text-white font-vcr text-sm justify-center items-center flex"
            id="borderLight"
          >
            {circuitInformation?.PKP?.publicKey}
          </div>
        </div>
        <div className="relative w-full h-fit gap-1 flex flex-col">
          <div
            className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
            id="blur"
          >
            IPFS Hash
          </div>
          <div
            className="bg-aBlack w-full h-fit break-all p-1 text-white font-vcr text-sm justify-center items-center flex"
            id="borderLight"
          >
            {ipfsHash}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitInput;
