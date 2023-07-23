import { FunctionComponent } from "react";
import { MintPKPProps } from "../../types/circuitflow.types";
import copy from "copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";

const MintPKP: FunctionComponent<MintPKPProps> = ({
  pkpLoading,
  handleMintGrantBurnPKP,
  signedPKPTx,
  openChainModal,
  switchNeededPKP,
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
            onClick={
              switchNeededPKP ? openChainModal : () => handleMintGrantBurnPKP()
            }
          >
            <div
              className={`relative w-fit h-fit items-center justify-center flex  ${
                pkpLoading && "animate-spin"
              }`}
            >
              {pkpLoading ? (
                <AiOutlineLoading size={15} color="white" opacity={80} />
              ) : (
                "mint pkp"
              )}
            </div>
          </div>
          {switchNeededPKP && (
            <div className="relative break-words text-xs font-vcr text-ballena flex items-center text-center justify-center">{`( switch to chronicle network )`}</div>
          )}
          {signedPKPTx?.address && (
            <div
              className={`relative w-fit flex flex-col gap-3 justify-center items-center h-fit`}
            >
              <div className="relative w-full h-fit flex flex-row gap-1 justify-center items-center">
                <div
                  className="relative w-fit h-fit justify-start items-start flex font-vcr text-ballena text-base"
                  id="blur"
                >
                  PKP Address
                </div>
                <div
                  className="relative w-fit h-fit justify-start items-start cursor-pointer active:scale-95"
                  id="blur"
                  onClick={() => copy(signedPKPTx?.address)}
                >
                  <BiCopy size={15} color="#FFD85F" />
                </div>
              </div>
              <div
                className={`relative w-fit text-left flex text-white font-vcr text-sm whitespace-nowrap break-words justify-start items-center h-full cursor-pointer`}
              >
                <input
                  value={signedPKPTx?.address || ""}
                  className="bg-aBlack w-44 h-8 p-1 text-white font-vcr text-sm justify-end items-start flex bg-black/40 lowercase border border-ballena border-l-8"
                  disabled
                />
              </div>
            </div>
          )}
          {signedPKPTx?.publicKey && (
            <div
              className={`relative w-fit flex flex-col gap-3 justify-center items-center h-fit`}
            >
              <div className="relative w-full h-fit flex flex-row gap-1 justify-center items-center">
                <div
                  className="relative w-fit h-fit justify-start items-start flex font-vcr text-ballena text-base"
                  id="blur"
                >
                  PKP Public Key
                </div>
                <div
                  className="relative w-fit h-fit justify-start items-start cursor-pointer active:scale-95"
                  id="blur"
                  onClick={() => copy(signedPKPTx?.publicKey)}
                >
                  <BiCopy size={15} color="#FFD85F" />
                </div>
              </div>
              <div
                className={`relative w-fit text-left flex text-white font-vcr text-sm whitespace-nowrap break-words justify-start items-center h-full cursor-pointer`}
              >
                <input
                  value={signedPKPTx?.publicKey || ""}
                  className="bg-aBlack w-44 h-8 p-1 text-white font-vcr text-sm justify-end items-start flex bg-black/40 lowercase border border-ballena border-l-8"
                  disabled
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MintPKP;
