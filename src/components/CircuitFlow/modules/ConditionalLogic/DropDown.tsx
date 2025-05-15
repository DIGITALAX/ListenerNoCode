import { FunctionComponent, useContext } from "react";
import { Condition, ContractCondition } from "../../types/litlistener.types";
import { DropDownLogicProps } from "../../types/circuitflow.types";
import { ModalContext } from "@/pages/_app";

const DropDown: FunctionComponent<DropDownLogicProps> = ({
  setDropDownOpenIndex,
  setDropDownOpen,
  inputChosen,
  dropDownOpen,
  title,
}): JSX.Element => {
  const context = useContext(ModalContext);
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
        {`${
          (
            context?.circuitInformation?.conditions[
              inputChosen - 1
            ] as ContractCondition
          )?.chainId
            ? "Contract Condition"
            : "Webhook Condition"
        } ${inputChosen}`}
      </div>
      {dropDownOpen && (
        <div className="absolute w-full h-60 overflow-y-scroll z-5 top-16">
          <div className="relative w-full h-fit flex flex-col bg-aBlack">
            {context?.circuitInformation?.conditions.map(
              (condition: Condition, index: number) => {
                return (
                  <div
                    key={index}
                    className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                    id="borderLight"
                    onClick={() => setDropDownOpenIndex(index)}
                  >
                    {`${
                      (condition as ContractCondition)?.chainId
                        ? "Contract Condition"
                        : "Webhook Condition"
                    } ${index + 1}`}
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
