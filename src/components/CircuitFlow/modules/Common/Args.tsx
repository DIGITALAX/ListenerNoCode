import { FunctionComponent } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ArgsProps } from "../../types/circuitflow.types";

const Args: FunctionComponent<ArgsProps> = ({
  setAddMoreArgs,
  args,
  setOnChangeArgs,
  placeholderText,
  nameTitle,
}): JSX.Element => {
  return (
    <div className="relative w-72 h-fit gap-1 flex flex-col p-1.5" id="inputBorder">
      <div className="relative flex flex-row justify-start items-center gap-1.5 w-fit h-fit">
        <div className="relative text-ballena font-vcr text-sm flex" id="blur">
          {nameTitle}
        </div>
        <div
          className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
          onClick={() => setAddMoreArgs()}
        >
          <IoMdAddCircleOutline size={15} color="#8EADB5" />
        </div>
      </div>
      <div className="relative w-full h-24 overflow-y-scroll flex">
        <div className="relative w-full h-fit flex-col gap-2 flex">
          {args?.map((arg: string, index: number) => {
            return (
              <input
                key={index}
                placeholder={placeholderText}
                value={arg || ""}
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) => setOnChangeArgs(e.target.value, index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Args;
