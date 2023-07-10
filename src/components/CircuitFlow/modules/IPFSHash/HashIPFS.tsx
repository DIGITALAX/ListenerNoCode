import { FunctionComponent } from "react";
import Input from "../Common/Input";
import { HashIPFSProps } from "../../types/circuitflow.types";
import { AiOutlineLoading } from "react-icons/ai";

const HashIPFS: FunctionComponent<HashIPFSProps> = ({
  handleHashToIPFS,
  ipfsLoading,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <Input text={"Hash your Lit Action Code to IPFS."} />
      <div className="flex flex-col w-full h-full border-4 border-moda p-1 gap-1.5 items-center justify-center">
        <div
          className={`relative w-36 px-1.5 h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase`}
          id="borderLight"
          onClick={() => handleHashToIPFS()}
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
      </div>
    </div>
  );
};

export default HashIPFS;
