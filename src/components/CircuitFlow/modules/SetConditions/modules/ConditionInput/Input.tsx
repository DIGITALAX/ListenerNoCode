import { FunctionComponent } from "react";
import { InputProps } from "@/components/CircuitFlow/types/circuitflow.types";

const Input: FunctionComponent<InputProps> = ({
  text,
  onChangeFunction,
  changedValue,
  count,
  placeholderText,
  password,
  setAPIPassword,
}): JSX.Element => {
  return (
    <div className="relative w-fit h-fit flex flex-row gap-3 items-center justify-center">
      {Array.from({ length: count }).map((_, index: number) => {
        return (
          <div
            className="relative w-72 h-40 flex flex-col p-2 gap-3 justify-center items-center px-4"
            id="inputBorder"
            key={index}
          >
            <div
              className="relative w-fit h-fit justify-start items-start flex font-vcr text-ballena text-base"
              id="blur"
            >
              {text[index]}
            </div>
            <input
              value={changedValue?.[index] || ""}
              placeholder={placeholderText[index]}
              className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex bg-black/40 border border-ballena border-l-8"
              onChange={(e) => onChangeFunction[index](e.target.value)}
              type={password ? "password" : "text"}
              onClick={() => setAPIPassword && setAPIPassword(!password)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Input;
