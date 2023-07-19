import { DropDownProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { FunctionComponent } from "react";

const DropDown: FunctionComponent<DropDownProps> = ({
  setDropDownOpenIndex,
  setDropDownOpen,
  inputChosen,
  dropDownOpen,
  title,
}): JSX.Element => {
  console.log(inputChosen);
  return (
    <div
      className="relative w-72 h-40 flex flex-col p-2 gap-3 justify-center items-center px-4 font-vcr text-ballena"
      id="inputBorder"
    >
      <div className="relative w-fit h-fit flex" id="blur">
        {title}
      </div>
      <div
        className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
        id="borderLight"
        onClick={() => setDropDownOpen()}
      >
        {inputChosen ? inputChosen : "ethereum"}
      </div>
      {dropDownOpen && (
        <div className="absolute w-full h-60 overflow-y-scroll z-10">
          <div className="relative w-full h-fit flex flex-col bg-aBlack">
            {Array.from([
              "ethereum",
              "polygon",
              "fantom",
              "bsc",
              "arbitrum",
              "avalanche",
              "fuji",
              "harmony",
              "mumbai",
              "goerli",
              "cronos",
              "optimism",
              "celo",
              "aurora",
              "alfajores",
              "xdc",
              "evmos",
              "evmosTestnet",
              "hardhat",
            ]).map((type: string, index: number) => {
              return (
                <div
                  key={index}
                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                  id="borderLight"
                  onClick={() => setDropDownOpenIndex(type)}
                >
                  {type}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
