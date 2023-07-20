import { FunctionComponent } from "react";
import { ResultIPFSProps } from "../../types/circuitflow.types";
import { AiOutlineLoading } from "react-icons/ai";

const ResultIPFS: FunctionComponent<ResultIPFSProps> = ({
  handleSaveToIPFSDB,
  dbLoading,
  dbAdded,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-40 flex flex-col p-2 gap-3 justify-center items-center"
      id="inputBorder"
    >
      <div
        className={`relative w-36 px-1.5 h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase border border-white`}
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
  );
};

export default ResultIPFS;
