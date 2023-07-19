import { FunctionComponent } from "react";
import { MintPKPProps } from "../../types/circuitflow.types";

import { AiOutlineLoading } from "react-icons/ai";

const MintPKP: FunctionComponent<MintPKPProps> = ({
  pkpLoading,
  handleMintGrantBurnPKP,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <div className="flex flex-col w-full h-full border-4 border-moda p-1 gap-1.5 items-center justify-center">
        <div
          className={`relative w-36 px-1.5 h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase`}
          id="borderLight"
          onClick={() => handleMintGrantBurnPKP()}
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
      </div>
    </div>
  );
};

export default MintPKP;
