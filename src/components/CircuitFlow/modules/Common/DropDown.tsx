import { DropDownProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { FunctionComponent } from "react";

const DropDown: FunctionComponent<DropDownProps> = ({
  setDropDownOpenIndex,
  setDropDownOpen,
  inputChosen,
  dropDownOpen,
  title,
  inputArray,
  top,
  border,
}): JSX.Element => {
  return (
    <div
      className={`relative w-72 ${
        border ? "h-fit" : "h-40"
      } flex flex-col p-2 gap-3 justify-center items-center px-4 font-vcr text-ballena`}
      id={border ? "" : "inputBorder"}
    >
      <div className="relative w-fit h-fit flex" id="blur">
        {title}
      </div>
      <div
        className="relative w-full h-10 bg-aBlack text-white font-vcr text-base flex justify-center items-center text-center cursor-pointer"
        id="borderLight"
        onClick={() => setDropDownOpen()}
      >
        {inputChosen}
      </div>
      {dropDownOpen && (
        <div
          className={`absolute w-full h-60 overflow-y-scroll z-10`}
          style={{ top: top ? top : "auto" }}
        >
          <div className="relative w-full h-fit flex flex-col bg-aBlack">
            {inputArray.map((type: string, index: number) => {
              return (
                <div
                  key={index}
                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                  id="borderLight"
                  onClick={() => setDropDownOpenIndex(type, index)}
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
