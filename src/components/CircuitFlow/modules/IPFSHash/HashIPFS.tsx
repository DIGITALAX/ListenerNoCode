import { FunctionComponent } from "react";
import { HashIPFSProps } from "../../types/circuitflow.types";
import { AiOutlineLoading } from "react-icons/ai";
import copy from "copy-to-clipboard";
import { BiCopy } from "react-icons/bi";

const HashIPFS: FunctionComponent<HashIPFSProps> = ({
  handleInstantiateCircuit,
  ipfsLoading,
  ipfsHash,
  litActionCode,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <div className="flex w-full h-full overflow-y-scroll">
        <div className="relative w-full h-fit gap-6 flex flex-col px-1.5 py-2.5 justify-center items-center">
          <div
            className={`relative w-36 px-1.5 h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase border border-white`}
            onClick={() => handleInstantiateCircuit()}
          >
            <div
              className={`relative w-fit h-fit items-center justify-center flex  ${
                ipfsLoading && "animate-spin"
              }`}
            >
              {ipfsLoading ? (
                <AiOutlineLoading size={15} color="white" opacity={80} />
              ) : (
                "hash to ipfs"
              )}
            </div>
          </div>
          {ipfsHash && (
            <div
              className={`relative w-fit flex flex-col gap-3 justify-center items-center h-fit`}
            >
              <div className="relative w-full h-fit flex flex-row gap-1 justify-center items-center">
                <div
                  className="relative w-fit h-fit justify-start items-start flex font-vcr text-ballena text-base"
                  id="blur"
                >
                  IPFS Hash
                </div>
                <div
                  className="relative w-fit h-fit justify-start items-start cursor-pointer active:scale-95"
                  id="blur"
                  onClick={() => copy(ipfsHash)}
                >
                  <BiCopy size={15} color="#FFD85F" />
                </div>
              </div>
              <div
                className={`relative w-fit text-left flex text-white font-vcr text-sm whitespace-nowrap break-words justify-start items-center h-full cursor-pointer`}
              >
                <input
                  value={ipfsHash || ""}
                  className="bg-aBlack w-44 h-8 p-1 text-white font-vcr text-sm justify-end items-start flex bg-black/40 lowercase border border-ballena border-l-8"
                  disabled
                />
              </div>
            </div>
          )}
          {litActionCode && (
            <div
              className={`relative w-fit flex flex-col gap-3 justify-center items-center h-fit`}
            >
              <div className="relative w-full h-fit flex flex-row gap-1 justify-center items-center">
                <div
                  className="relative w-fit h-fit justify-start items-start flex font-vcr text-ballena text-base"
                  id="blur"
                >
                  Lit Action Code
                </div>
                <div
                  className="relative w-fit h-fit justify-start items-start cursor-pointer active:scale-95"
                  id="blur"
                  onClick={() => copy(litActionCode)}
                >
                  <BiCopy size={15} color="#FFD85F" />
                </div>
              </div>
              <div className="relative w-fit h-full flex overflow-y-scroll">
                <div className="relative w-fit h-fit flex flex-col gap-1 justify-start items-start">
                  <textarea
                    value={litActionCode}
                    className="bg-aBlack w-52 h-60 p-1 text-white font-vcr text-sm justify-end items-start flex bg-black/40 lowercase border border-ballena border-l-8"
                    disabled
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HashIPFS;
