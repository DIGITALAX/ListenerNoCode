import { FunctionComponent } from "react";
import Output from "../Common/Output";
import { ResultIPFSProps } from "../../types/circuitflow.types";
import { AiOutlineLoading } from "react-icons/ai";

const ResultIPFS: FunctionComponent<ResultIPFSProps> = ({
  ipfsLoading,
  ipfsHash,
  handleSaveToIPFSDB,
  dbLoading,
  dbAdded,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="outputBorder"
    >
      <Output
        text={
          ipfsHash
            ? "Would you like to save your hash to the Lit Action Code on-chain database for easy reuse?"
            : "Hash Lit Action Code to IPFS and Instantiate Circuit."
        }
      />
      {ipfsHash && (
        <div className="flex w-full h-full border-4 border-moda overflow-y-scroll">
          <div className="relative w-full h-fit gap-6 flex flex-col px-1.5 py-2.5 justify-start items-center">
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
              here
            </div>
            <div
              className={`relative w-36 px-1.5 h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase`}
              id="borderLight"
              onClick={() => handleSaveToIPFSDB()}
            >
              <div
                className={`relative w-fit h-fit items-center justify-center flex  ${
                  dbLoading && "animate-spin"
                }`}
              >
                {dbLoading ? (
                  <AiOutlineLoading size={15} color="white" opacity={80} />
                ) : dbAdded ? (
                  "saved on-chain"
                ) : (
                  "save on-chain"
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultIPFS;
