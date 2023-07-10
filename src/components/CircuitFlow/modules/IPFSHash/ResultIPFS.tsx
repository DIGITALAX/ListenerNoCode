import { FunctionComponent } from "react";
import Output from "../Common/Output";
import { ResultIPFSProps } from "../../types/circuitflow.types";
import { AiOutlineLoading } from "react-icons/ai";

const ResultIPFS: FunctionComponent<ResultIPFSProps> = ({
  ipfsLoading,
  ipfsHash,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="outputBorder"
    >
      <Output
        text={
          "Your hash will be saved in the Lit Action Code on-chain database for easy reuse."
        }
      />
      <div
        className={`flex flex-col w-full h-full border-4 border-moda p-1 gap-1.5 items-center justify-center font-vcr text-white`}
      >
        <div
          className={`${
            ipfsLoading && "animate-spin"
          } flex items-center justify-center break-all whitespace-pre-wrap h-fit text-center`}
        >
          {ipfsLoading ? (
            <AiOutlineLoading size={15} color="white" opacity={80} />
          ) : (
            ipfsHash
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultIPFS;
