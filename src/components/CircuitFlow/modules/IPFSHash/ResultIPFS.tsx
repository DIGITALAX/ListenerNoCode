import { FunctionComponent } from "react";
import { ResultIPFSProps } from "../../types/circuitflow.types";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";

const ResultIPFS: FunctionComponent<ResultIPFSProps> = ({
  handleSaveToIPFSDB,
  dbLoading,
  dbAdded,
  switchNeeded,
  openChainModal,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-40 flex flex-col p-2 gap-3 justify-center items-center"
      id="inputBorder"
    >
      <div
        className={`relative w-36 px-1.5 h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase border border-white`}
        onClick={switchNeeded ? openChainModal : () => handleSaveToIPFSDB()}
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
      {switchNeeded && (
        <div className="relative break-words text-xs font-vcr text-ballena flex items-center justify-center  text-center">{`( switch to polygon network )`}</div>
      )}
      {dbAdded && (
        <div
          className={`flex flex-col w-full h-full p-1 gap-4 items-center justify-center font-vcr text-white`}
        >
          <Link
            className={`relative w-36 px-1.5 h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase`}
            id="borderLight"
            target="_blank"
            rel="noreferrer"
            href={"/actions"}
          >
            <div
              className={`relative w-fit h-fit items-center justify-center flex`}
            >
              view saved actions
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResultIPFS;
