import { FunctionComponent } from "react";
import { InputLogicProps } from "../../types/circuitflow.types";

const Input: FunctionComponent<InputLogicProps> = ({
  valueCondition,
  setCondition,
  placeholderText,
  mainText
}): JSX.Element => {
  return (
    <div className="relative w-fit h-fit flex flex-row gap-3 items-center justify-center">
      <div
        className="relative w-72 h-40 flex flex-col p-2 gap-3 justify-center items-center px-4"
        id="inputBorder"
      >
        <div
          className="relative w-fit h-fit justify-start items-start flex font-vcr text-ballena text-base"
          id="blur"
        >
          {mainText}
        </div>
        <input
          value={valueCondition || 180000000}
          placeholder={placeholderText}
          className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex bg-black/40 border border-ballena border-l-8"
          onChange={(e) => setCondition(Number(e.target.value))}
          type="number"
        />
      </div>
    </div>
  );
};

export default Input;
